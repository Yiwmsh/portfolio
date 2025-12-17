import React from "react";
import { displayMs } from "../../utils/displayMs";
import { CardsGrid } from "./CardsGrid";
import { useScryfallQuery } from "./hooks/scryfallQuery";
import { Deck, ScryfallCard } from "./types";
import { compileScoreMap, sortCards } from "./utilities/card sorting";

interface QueryResultsDisplayProps {
  query: string;
  deck: Deck;
}

export const QueryResultsDisplay: React.FC<QueryResultsDisplayProps> = ({
  deck,
  query,
}) => {
  const {
    cards,
    currentPage,
    totalCards,
    executeQuery,
    status,
    estTimeRemaining,
  } = useScryfallQuery();

  const [sortedCards, setSortedCards] = React.useState<ScryfallCard[]>([]);

  const updateSortedCards = async () => {
    const scoreMap = await compileScoreMap(deck);
    const sorted = sortCards(scoreMap, cards);
    setSortedCards(sorted);
  };

  if (status === "loading") {
    return (
      <div>
        <div>
          Loading: {cards.length} / {totalCards} cards
        </div>
        <div>Estimated time remaining: {displayMs(estTimeRemaining)}</div>
      </div>
    );
  }

  return (
    <div>
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
          updateSortedCards();
        }}
      >
        Sort
      </button>
      <div>Cards: {totalCards}</div>
      <CardsGrid cards={sortedCards.length > 0 ? sortedCards : cards} />
    </div>
  );
};
