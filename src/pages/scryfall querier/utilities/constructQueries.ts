import { Deck } from "../types";

export const constructQueries = (
  globalQuery: string,
  deck?: Deck
): string[] => {
  let queries: string[] = [];

  if (!deck || !deck.deckQueryFragment) {
    return [globalQuery];
  }

  if (!deck.goals || deck.goals.size === 0) {
    return [`${globalQuery} ${deck.deckQueryFragment}`];
  }

  deck.goals.forEach((goal, goalId) => {
    const query = `${globalQuery} ${deck.deckQueryFragment} ${goal.queryTerms}`;
    queries.push(query);
  });

  return queries;
};
