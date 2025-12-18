import React from "react";
import { displayMs } from "../../utils/displayMs";
import { CardsGrid } from "./CardsGrid";
import { useSelectedDeck } from "./hooks/decks";
import { useScryfallQuery } from "./hooks/scryfallQuery";
import { ScryfallCard } from "./types";
import { compileScoreMap, sortCards } from "./utilities/card sorting";

interface QueryResultsDisplayProps {
  query: string;
}

export const QueryResultsDisplay: React.FC<QueryResultsDisplayProps> = ({
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

  const { data: { selectedDeck } = {} } = useSelectedDeck();

  const updateSortedCards = async () => {
    if (selectedDeck == null) {
      return;
    }
    const scoreMap = await compileScoreMap(selectedDeck);
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
