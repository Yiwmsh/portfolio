import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { LowFrictionInput } from "../Components/LowFrictionInput";
import { useSelectedDeck, useUpdateDeck } from "../hooks/decks";
import {
  useGlobalScryfallQueryTerms,
  useUpdateGlobalScryfallQueryTerms,
} from "../hooks/globalScryfallQueryTerms";
import { useSiteSetting } from "../hooks/siteSettings";
import { DeckGoalsList } from "./DeckGoalsList";

const SectionContainerStyle: React.CSSProperties = {
  border: `1px solid var(${SemanticColors.primary})`,
  maxWidth: "100%",
  overflow: "hidden",
  padding: "1rem",
  margin: "1rem",
};

const CloseButtonStyle: React.CSSProperties = {
  width: "50px",
  fontSize: "1.5rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  marginTop: "-5%",
};

export const QueryModifiersView: React.FC = () => {
  const { data: globalQuery, status: globalQueryStatus } =
    useGlobalScryfallQueryTerms();
  const { mutate: updateGlobalQuery } = useUpdateGlobalScryfallQueryTerms();
  const { data: { selectedDeck, selectedDeckId } = {} } = useSelectedDeck();
  const { mutate: updateDeck } = useUpdateDeck();

  const { setSetting: setIsOpen } = useSiteSetting("deck modal status");

  return (
    <>
      <div
        style={{
          width: "70vw",
          height: "70vh",
          position: "relative",
          zIndex: 2,
          background: `var(${SemanticColors.midground})`,
          margin: "auto",
          border: `1px solid var(${SemanticColors.primary})`,
          padding: "1rem",
          overflow: "hidden",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            aria-hidden
            style={{ ...CloseButtonStyle, visibility: "hidden" }}
          />
          <h1
            style={{
              textAlign: "center",
            }}
          >
            Query Modifiers
          </h1>
          <button
            style={CloseButtonStyle}
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
        </div>
        <div style={SectionContainerStyle}>
          <h2>Global</h2>
          {globalQueryStatus !== "loading" && (
            <div>
              <label>Global Query Terms: </label>
              <LowFrictionInput
                value={globalQuery}
                onUpdate={updateGlobalQuery}
              />
            </div>
          )}
        </div>
        <div style={SectionContainerStyle}>
          <h2>Deck</h2>
          {selectedDeck && selectedDeckId && (
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
              <DeckGoalsList />
            </>
          )}
        </div>
      </div>
    </>
  );
};
