import React from "react";
import { displayMs } from "../../utils/displayMs";
import { CardsGrid } from "./CardsGrid";
import { useSelectedDeck } from "./hooks/decks";
import { useScryfallQuery } from "./hooks/scryfallQuery";
import { ScryfallCard } from "./types";
import { compileScoreMap, sortCards } from "./utilities/card sorting";
import { displayScryfallError } from "./utilities/displayScryfallError";

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
    error,
  } = useScryfallQuery();

  const [sortedCards, setSortedCards] = React.useState<ScryfallCard[]>([]);

  const { data: { selectedDeck } = {} } = useSelectedDeck();

  const [sorting, setSorting] = React.useState(false);

  const updateSortedCards = async () => {
    if (selectedDeck == null) {
      return;
    }
    setSorting(true);
    const scoreMap = await compileScoreMap(selectedDeck);
    const sorted = sortCards(scoreMap, cards);
    setSortedCards(sorted);
    setSorting(false);
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
          margin: "10px 0",
        }}
      >
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
      </div>
      {error != null ? (
        <div style={{ color: "red" }}>
          There was an error with your query:{" "}
          {displayScryfallError(error).toLowerCase()}.
        </div>
      ) : totalCards > 0 ? (
        <div>Cards: {totalCards}</div>
      ) : null}
      {!sorting && (
        <CardsGrid cards={sortedCards.length > 0 ? sortedCards : cards} />
      )}
    </div>
  );
};
