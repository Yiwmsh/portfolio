import React from "react";
import { useSelectedDeck } from "./hooks/decks";
import { useGlobalScryfallQueryTerms } from "./hooks/globalScryfallQueryTerms";
import { composeQuery } from "./hooks/scryfallQuery";
import { QueryResultsDisplay } from "./QueryResultsDisplay";

export const SearchView: React.FC = () => {
  const { data: globalQuery } = useGlobalScryfallQueryTerms();
  const { data: { selectedDeck } = {} } = useSelectedDeck();

  const [search, setSearch] = React.useState("");

  const query = React.useMemo(() => {
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
  }, [globalQuery, search, selectedDeck]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "600px",
      }}
    >
      <div>
        <label>Search scryfall: </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <QueryResultsDisplay query={query} />
    </div>
  );
};
