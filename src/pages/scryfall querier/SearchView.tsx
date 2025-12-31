import React from "react";
import { displayMs } from "../../utils/displayMs";
import { CardsGrid } from "./CardsGrid";
import { useSelectedDeck } from "./hooks/decks";
import { useGlobalScryfallQueryTerms } from "./hooks/globalScryfallQueryTerms";
import { composeQuery, useScryfallQuery } from "./hooks/scryfallQuery";
import { ScryfallCard } from "./types";
import { compileScoreMap, sortCards } from "./utilities/card sorting";
import { displayScryfallError } from "./utilities/displayScryfallError";

export const SearchView: React.FC = () => {
  const { data: globalQuery } = useGlobalScryfallQueryTerms();
  const { data: { selectedDeck } = {} } = useSelectedDeck();

  const { cards, totalCards, executeQuery, status, estTimeRemaining, error } =
    useScryfallQuery();

  const [search, setSearch] = React.useState("");

  const compileQuery = (search: string) => {
    let queryTerms: string[] = [];

    if (globalQuery) {
      queryTerms.push(globalQuery);
    }

    if (selectedDeck && selectedDeck.deckQueryFragment) {
      queryTerms.push(selectedDeck.deckQueryFragment);
    }

    if (search) {
      queryTerms.push(search);
    }

    return composeQuery(...queryTerms);
  };

  const query = React.useMemo(() => {
    return compileQuery(search);
  }, [globalQuery, search, selectedDeck]);

  const [sortedCards, setSortedCards] = React.useState<ScryfallCard[]>([]);

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

  return (
    <>
      {status === "loading" ? (
        <>
          <div>
            <div>
              Loading: {cards.length} / {totalCards} cards
            </div>
            <div>Estimated time remaining: {displayMs(estTimeRemaining)}</div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label>Search scryfall: </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const q = compileQuery(e.currentTarget.value);
                  executeQuery(q, selectedDeck ?? undefined);
                }
              }}
            />
          </div>
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
                executeQuery(query, selectedDeck ?? undefined);
              }}
            >
              Search
            </button>
            <button
              onClick={() => {
                updateSortedCards();
              }}
              style={{
                display: selectedDeck == null ? "none" : "unset",
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
            `Cards: ${cards.length}`
          ) : null}
          {!sorting && (
            <CardsGrid cards={sortedCards.length > 0 ? sortedCards : cards} />
          )}
          {sorting && "Sorting"}
        </>
      )}
    </>
  );
};
