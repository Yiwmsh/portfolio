import localforage from "localforage";
import { GOALS_QUERY_KEY, ScryfallCard } from "../hooks/scryfallQuery";
import { Deck } from "../types";

export const compileScoreMap = async (
  deck: Deck
): Promise<Map<string, number>> => {
  let scoreMap = new Map<string, number>();

  for (const [goalId, goal] of Array.from(deck.goals.entries())) {
    const instance = await localforage.createInstance({
      name: GOALS_QUERY_KEY,
      storeName: goalId,
    });
    await instance.iterate((_, cardId) => {
      const currentScore = scoreMap.get(cardId);
      scoreMap.set(cardId, (currentScore ?? 0) + goal.score);
    });
  }

  return scoreMap;
};

export const sortCards = (
  scoreMap: Map<string, number>,
  cards: ScryfallCard[]
): ScryfallCard[] => {
  let scored: ScryfallCard[] = [];

  for (const card of cards) {
    const score = scoreMap.get(card.oracle_id);
    scored.push({ ...card, score });
  }

  const sorted = scored.toSorted((a, b) => {
    const aScore = a.score ?? 0;
    const bScore = b.score ?? 0;

    if (aScore > bScore) {
      return -1;
    } else if (aScore < bScore) {
      return 1;
    } else {
      return 0;
    }
  });

  return sorted;
};
