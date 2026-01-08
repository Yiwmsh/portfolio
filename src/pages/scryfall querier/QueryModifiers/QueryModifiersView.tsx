import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { LowFrictionInput } from "../Components/LowFrictionInput";
import { useSelectedDeck, useUpdateDeck } from "../hooks/decks";
import {
  useGlobalScryfallQueryTerms,
  useUpdateGlobalScryfallQueryTerms,
} from "../hooks/globalScryfallQueryTerms";
import { DeckGoalsList } from "./DeckGoalsList";

const SectionContainerStyle: React.CSSProperties = {
  border: `1px solid var(${SemanticColors.primary})`,
  maxWidth: "100%",
  padding: "1rem",
  margin: "1rem",
};

export const QueryModifiersView: React.FC = () => {
  const { data: globalQuery, status: globalQueryStatus } =
    useGlobalScryfallQueryTerms();
  const { mutate: updateGlobalQuery } = useUpdateGlobalScryfallQueryTerms();
  const { data: { selectedDeck, selectedDeckId } = {} } = useSelectedDeck();
  const { mutate: updateDeck } = useUpdateDeck();

  return (
    <div
      style={{
        flex: "100",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div style={SectionContainerStyle}>
        <h2>Global Settings</h2>
        {globalQueryStatus !== "loading" && (
          <div>
            <label>Global Query Terms: </label>
            <LowFrictionInput
              value={globalQuery}
              onUpdate={updateGlobalQuery}
              style={{
                width: `calc(100% - 20ch - 2rem)`,
              }}
            />
          </div>
        )}
      </div>
      <div style={SectionContainerStyle}>
        <h2>Deck Settings</h2>
        {selectedDeck && selectedDeckId && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
                style={{
                  width: `calc(100% - 20ch - 2rem)`,
                }}
              />
            </div>
            <DeckGoalsList />
          </>
        )}
      </div>
    </div>
  );
};
