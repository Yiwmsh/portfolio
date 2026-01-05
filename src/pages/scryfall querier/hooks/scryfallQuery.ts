import localforage from "localforage";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { Url } from "url";
import { Deck, DeckGoal, ScryfallCard } from "../types";
import { compileScoreMap, sortCards } from "../utilities/card sorting";

export const GOAL_ERROR_CODE_KEY = "errorCode";
export const GOAL_ERROR_MESSAGE_KEY = "errorMessage";

const SCRYFALL_API_BASE = "https://api.scryfall.com";

const QUERY_DELAY_MS = 500;

const SCRYFALL_MAX_PAGE_SIZE = 175;

interface ScryfallResponse {
  total_cards: number;
  has_more: boolean;
  next_page: Url;
  data: ScryfallCard[];
}

export const composeQuery = (...queryClusters: string[]): string => {
  let query = SCRYFALL_API_BASE + "/cards/search?q=";

  for (const queryCluster of queryClusters) {
    query += encodeURI(` (${queryCluster.trim()})`);
  }

  return query;
};

export const useScryfallCard = (cardName: string) =>
  useQuery(cardName, async () => {
    const query =
      SCRYFALL_API_BASE + "/cards/named?fuzzy=" + encodeURI(cardName);
    const response = await fetch(query);
    const data: ScryfallCard = await response.json();
    return data;
  });

interface GetAllQueryPagesProps {
  queryUrl: string;
  handleResponse: (
    scryfallResponse: ScryfallResponse,
    page: number,
    queryTimeMs: number
  ) => void;
  handleError?: (
    errorCode: number,
    errorMessage: string,
    currentErrorCount: number
  ) => void;
  maxErrors?: number;
}

const getAllQueryPages = async (
  props: GetAllQueryPagesProps
): Promise<void> => {
  const { queryUrl, handleResponse, handleError, maxErrors = 1 } = { ...props };
  let page = 1;
  let has_more = true;
  let errors = 0;

  while (has_more) {
    const startTime = Date.now();
    const response = await fetch(queryUrl + `&page=${page}`);

    if (response.ok) {
      const data: ScryfallResponse = await response.json();
      const elapsed = Date.now() - startTime;

      has_more = data.has_more;

      handleResponse(data, page, elapsed);

      page += 1;
    } else {
      const errorCode = response.status;
      const errorMessage = response.statusText;
      handleError?.(errorCode, errorMessage, errors);
      errors += 1;

      if (maxErrors != null && errors >= maxErrors) {
        return;
      }
    }

    if (has_more) {
      await new Promise((f) => setTimeout(f, QUERY_DELAY_MS));
    }
  }
};

const estimateRemainingTimeMs = (
  queryTimes: number[],
  cardsSoFar: number,
  totalCards: number
): number => {
  const avgQueryTime =
    queryTimes.reduce((total, n) => total + n, 0) / queryTimes.length;
  const estTimePerQuery = avgQueryTime + QUERY_DELAY_MS;
  const queriesRemaining = (totalCards - cardsSoFar) / SCRYFALL_MAX_PAGE_SIZE;
  return queriesRemaining * estTimePerQuery;
};

export type ScryfallError = {
  message?: string;
  code?: number;
};

export const useScryfallQuery = () => {
  const [cards, setCards] = React.useState<ScryfallCard[]>([]);
  const [totalCards, setTotalCards] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [status, setStatus] = React.useState<"loading" | "finished">(
    "finished"
  );
  const [estTimeRemaining, setEstTimeRemaining] = React.useState(0);
  const [error, setError] = React.useState<ScryfallError | null>(null);

  const executeQuery = async (query: string, deck?: Deck) => {
    setStatus("loading");
    setError(null);
    setEstTimeRemaining(0);
    setCards([]);
    setTotalCards(0);
    setCurrentPage(1);
    let newCards: ScryfallCard[] = [];
    let queryTimes: number[] = [];

    const scoreMap = deck == null ? null : await compileScoreMap(deck);

    await getAllQueryPages({
      queryUrl: query,
      handleResponse: (scryfallResponse, page, queryTimeMs) => {
        newCards.push(...scryfallResponse.data);
        setTotalCards(scryfallResponse.total_cards);
        setCurrentPage(page);
        setCards(newCards);

        queryTimes.push(queryTimeMs);

        setEstTimeRemaining(
          estimateRemainingTimeMs(
            queryTimes,
            newCards.length,
            scryfallResponse.total_cards
          )
        );
      },
      handleError: (errorCode, errorMessage) => {
        setError({
          code: errorCode,
          message: errorMessage,
        });
      },
    });

    if (scoreMap != null) {
      const sorted = sortCards(scoreMap, newCards);
      await setTimeout(() => {}, 10);
      setCards(sorted);
    }

    setStatus("finished");
  };

  return {
    cards,
    totalCards,
    currentPage,
    executeQuery,
    status,
    estTimeRemaining,
    error,
  };
};

export const GOALS_QUERY_KEY = "goals";

interface GoalProgress {
  totalCards: number;
  cardsSoFar: number;
  page: number;
  hasMore: boolean;
  queryString: string;
}

export type DeckGoalWithId = DeckGoal & {
  goalId: string;
};

export interface UpdateGoalsCacheProps {
  goals: DeckGoalWithId[];
  globalQuery: string;
  deckQuery: string;
}

export const useUpdateGoalCache = () => {
  const [totalCards, setTotalCards] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [estTimeRemaining, setEstTimeRemaining] = React.useState(0);

  return {
    ...useMutation({
      mutationFn: async (props: UpdateGoalsCacheProps) => {
        const { goals, deckQuery, globalQuery } = { ...props };
        let allGoalProgress = new Map<string, GoalProgress>();
        let currentProgress = 0;
        let currentTotalCards = 0;
        let hasMore = true;
        let queryTimes: number[] = [];
        let currentEstTimeRemaining = 0;
        let erroredGoals = new Set();

        setTotalCards(0);
        setProgress(0);
        setEstTimeRemaining(0);

        while (hasMore) {
          hasMore = false;

          if (erroredGoals.size === goals.length) {
            return;
          }

          for (const goal of goals) {
            if (erroredGoals.has(goal.goalId)) {
              continue;
            }

            const goalTable = localforage.createInstance({
              name: GOALS_QUERY_KEY,
              storeName: goal.goalId,
            });

            // Create a new entry for this goal's progress if it doesn't exist already.
            if (!allGoalProgress.has(goal.goalId)) {
              await goalTable.clear();
              await goalTable.setItem(
                GOAL_ERROR_MESSAGE_KEY,
                "Query interrupted"
              );
              const goalQuery = composeQuery(
                deckQuery,
                globalQuery,
                goal.queryTerms
              );
              const goalProgress: GoalProgress = {
                page: 1,
                hasMore: true,
                queryString: goalQuery,
                totalCards: 0,
                cardsSoFar: 0,
              };
              allGoalProgress.set(goal.goalId, goalProgress);
            }

            const goalProgress = allGoalProgress.get(goal.goalId);

            if (goalProgress?.hasMore) {
              const startTime = Date.now();
              const response = await fetch(
                goalProgress.queryString + `&page=${goalProgress.page}`
              );

              if (!response.ok) {
                erroredGoals.add(goal.goalId);
                goalTable.clear();
                goalTable.setItem(GOAL_ERROR_CODE_KEY, response.status);
                goalTable.setItem(GOAL_ERROR_MESSAGE_KEY, response.statusText);
                currentTotalCards -= goalProgress.totalCards;
                setTotalCards(currentTotalCards);
                currentProgress -= goalProgress.cardsSoFar;
                setProgress(currentProgress);
                console.log(
                  `Encountered error when querying ${goal.name} - status: ${response.status} - message: ${response.statusText}`
                );
                continue;
              }

              const data: ScryfallResponse = await response.json();
              queryTimes.push(Date.now() - startTime);
              currentEstTimeRemaining = estimateRemainingTimeMs(
                queryTimes,
                currentProgress,
                currentTotalCards
              );
              setEstTimeRemaining(currentEstTimeRemaining);

              let newGoalProgress: GoalProgress = {
                ...goalProgress,
                totalCards: data.total_cards,
                cardsSoFar: goalProgress.cardsSoFar + data.data.length,
              };
              newGoalProgress.hasMore = data.has_more;
              if (data.has_more) {
                hasMore = true;
                newGoalProgress.page += 1;
              } else {
                goalTable.removeItem(GOAL_ERROR_MESSAGE_KEY);
              }

              if (goalProgress.page === 1) {
                currentTotalCards += data.total_cards;
                setTotalCards(currentTotalCards);
              }

              for (const card of data.data) {
                await goalTable.setItem(card.oracle_id, 1);
                currentProgress += 1;
                setProgress(currentProgress);
              }

              allGoalProgress.set(goal.goalId, newGoalProgress);
              await new Promise((f) => setTimeout(f, QUERY_DELAY_MS));
            }
          }
        }
        return;
      },
    }),
    totalCards,
    progress,
    estTimeRemaining,
  };
};
