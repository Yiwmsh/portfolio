import React from "react";
import { LowFrictionInput } from "./Components/LowFrictionInput";
import { DeckGoalsList } from "./GoalsDisplay/DeckGoalsList";
import { useDeck, useUpdateDeck } from "./hooks/decks";
import {
  useGlobalScryfallQueryTerms,
  useUpdateGlobalScryfallQueryTerms,
} from "./hooks/globalScryfallQueryTerms";
import { composeQuery } from "./hooks/scryfallQuery";
import { QueryResultsDisplay } from "./QueryResultsDisplay";

interface QueryEditorViewProps {
  selectedDeckGuid?: string;
}

export const QueryEditorView: React.FC<QueryEditorViewProps> = ({
  selectedDeckGuid,
}) => {
  const { data: globalQuery, status: globalQueryStatus } =
    useGlobalScryfallQueryTerms();
  const { mutate: updateGlobalQuery } = useUpdateGlobalScryfallQueryTerms();

  const { data: selectedDeck, status: selectedDeckStatus } = useDeck(
    selectedDeckGuid ?? ""
  );
  const { mutate: updateDeck } = useUpdateDeck();

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
      {globalQueryStatus !== "loading" && (
        <div>
          <label>Global Query Terms: </label>
          <LowFrictionInput
            value={globalQuery}
            onUpdate={updateGlobalQuery}
          />
        </div>
      )}
      {selectedDeck && selectedDeckGuid && (
        <>
          <div>
            <label>Deck Query Terms: </label>
            <LowFrictionInput
              value={selectedDeck.deckQueryFragment}
              onUpdate={(newValue) =>
                updateDeck({
                  ...selectedDeck,
                  deckQueryFragment: newValue,
                  lastUpdated: new Date(),
                })
              }
            />
          </div>
          <DeckGoalsList
            selectedDeckGuid={selectedDeckGuid}
            globalQuery={globalQuery}
          />
          <div>
            <label>Search scryfall: </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <QueryResultsDisplay
            query={query}
            deck={selectedDeck}
          />
        </>
      )}
    </div>
  );
};
