import localforage from "localforage";
import React from "react";
import { CardsGrid } from "./CardsGrid";
import {
  GOALS_QUERY_KEY,
  ScryfallCard,
  useScryfallQuery,
} from "./hooks/scryfallQuery";
import { Deck } from "./types";

interface QueryResultsDisplayProps {
  query: string;
  deck: Deck;
}

export const QueryResultsDisplay: React.FC<QueryResultsDisplayProps> = ({
  deck,
  query,
}) => {
  const { cards, currentPage, totalCards, executeQuery, status } =
    useScryfallQuery();

  const [sortedCards, setSortedCards] = React.useState<ScryfallCard[]>([]);

  const sortCards = async () => {
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let score = 0;

      for (const [goalId, goal] of Array.from(deck.goals.entries())) {
        const instance = await localforage.createInstance({
          name: GOALS_QUERY_KEY,
          storeName: goalId,
        });
        const foundValue = await instance.getItem(card.oracle_id);
        if (foundValue !== null) {
          score += goal.score;
        }
      }

      cards[i] = { ...card, score };
    }
    const sorted = cards.toSorted((a, b) => {
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
    setSortedCards(sorted);
  };

  if (status === "loading") {
    return `Loading: ${cards.length} / ${totalCards} cards.`;
  }

  return (
    <div>
      <div>
        <label>Query url: </label>
        {query}
      </div>
      <button
        disabled={!query}
        onClick={() => {
          setSortedCards([]);
          executeQuery(query);
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          sortCards();
        }}
      >
        Sort
      </button>
      <div>
        Cards: {cards.length}/{totalCards}{" "}
      </div>
      <div>Querying Page: {currentPage}</div>
      <CardsGrid cards={sortedCards.length > 0 ? sortedCards : cards} />
    </div>
  );
};
