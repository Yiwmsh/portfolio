import localforage from "localforage";
import React from "react";
import { useMutation } from "react-query";
import { Url } from "url";
import { DeckGoal } from "../types";

const SCRYFALL_API_BASE = "https://api.scryfall.com";

const QUERY_DELAY_MS = 500;

const SCRYFALL_PARAMETERS = [
  "q",
  "unique",
  "order",
  "dir",
  "include_extras",
  "include_multilingual",
  "include_variations",
  "page",
  "format",
  "pretty",
] as const;

type ScryfallParameter = (typeof SCRYFALL_PARAMETERS)[number];

const SCRYFALL_DESIGNATORS = [":", "=", "<", ">", ">=", "<="] as const;

type ScryfallDesignator = (typeof SCRYFALL_DESIGNATORS)[number];

type ScryfallQuery = Map<ScryfallParameter, string>;

export interface ScryfallCard {
  id: string;
  oracle_id: string;
  name: string;
  image_uris: {
    normal: string;
  };
  score?: number;
}

interface ScryfallResponse {
  total_cards: number;
  has_more: boolean;
  next_page: Url;
  data: ScryfallCard[];
}

export const composeQuery = (...queryClusters: string[]): string => {
  let query = SCRYFALL_API_BASE + "/cards/search?q=";

  for (const queryCluster of queryClusters) {
    query += encodeURI(` ${queryCluster.trim()}`);
  }

  return query;
};

const getAllQueryPages = async (
  queryUrl: string,
  callback: (scryfallResponse: ScryfallResponse, page: number) => void
): Promise<void> => {
  let page = 1;
  let has_more = true;

  while (has_more) {
    const response = await fetch(queryUrl + `&page=${page}`);
    const data: ScryfallResponse = await response.json();

    has_more = data.has_more;

    callback(data, page);

    page += 1;

    if (has_more) {
      await new Promise((f) => setTimeout(f, QUERY_DELAY_MS));
    }
  }
};

export const useScryfallQuery = () => {
  const [cards, setCards] = React.useState<ScryfallCard[]>([]);
  const [totalCards, setTotalCards] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [status, setStatus] = React.useState<"loading" | "finished">(
    "finished"
  );

  const executeQuery = async (query: string) => {
    setStatus("loading");
    setCards([]);
    setTotalCards(0);
    setCurrentPage(1);
    let newCards: ScryfallCard[] = [];
    await getAllQueryPages(query, (scryfallResponse, page) => {
      newCards.push(...scryfallResponse.data);

      setTotalCards(scryfallResponse.total_cards);
      setCurrentPage(page);
      setCards(newCards);
    });
    setStatus("finished");
  };

  return { cards, totalCards, currentPage, executeQuery, status };
};

export const GOALS_QUERY_KEY = "goals";

interface GoalProgress {
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

  return {
    ...useMutation({
      mutationFn: async (props: UpdateGoalsCacheProps) => {
        const { goals, deckQuery, globalQuery } = { ...props };
        let allGoalProgress = new Map<string, GoalProgress>();
        let currentProgress = 0;
        let currentTotalCards = 0;
        let hasMore = true;

        while (hasMore) {
          hasMore = false;

          for (const goal of goals) {
            const goalTable = localforage.createInstance({
              name: GOALS_QUERY_KEY,
              storeName: goal.goalId,
            });

            // Create a new entry for this goal's progress if it doesn't exist already.
            if (!allGoalProgress.has(goal.goalId)) {
              await goalTable.clear();
              const goalQuery = composeQuery(
                deckQuery,
                globalQuery,
                goal.queryTerms
              );
              const goalProgress: GoalProgress = {
                page: 1,
                hasMore: true,
                queryString: goalQuery,
              };
              allGoalProgress.set(goal.goalId, goalProgress);
            }

            const goalProgress = allGoalProgress.get(goal.goalId);

            if (goalProgress?.hasMore) {
              const response = await fetch(
                goalProgress.queryString + `&page=${goalProgress.page}`
              );
              const data: ScryfallResponse = await response.json();

              const queryCooldown = new Promise((f) =>
                setTimeout(f, QUERY_DELAY_MS)
              );

              let newGoalProgress: GoalProgress = { ...goalProgress };
              newGoalProgress.hasMore = data.has_more;
              if (data.has_more) {
                hasMore = true;
                newGoalProgress.page += 1;
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
              await queryCooldown;
            }
          }
        }

        setTotalCards(0);
        setProgress(0);
        return;
      },
    }),
    totalCards,
    progress,
  };
};
