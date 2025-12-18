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
  const {
    settingValue: isOpen,
    toggleSetting: toggleIsOpen,
    setSetting: setIsOpen,
  } = useSiteSetting("query modifiers view status");

  const { data: globalQuery, status: globalQueryStatus } =
    useGlobalScryfallQueryTerms();
  const { mutate: updateGlobalQuery } = useUpdateGlobalScryfallQueryTerms();
  const { data: { selectedDeck, selectedDeckId } = {} } = useSelectedDeck();
  const { mutate: updateDeck } = useUpdateDeck();

  return (
    <>
      {/* Modal Trigger */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0 20px",
        }}
        onClick={() => toggleIsOpen()}
      >
        <h3>Goals</h3>
      </button>
      {/* Translucent Background */}
      <div
        style={{
          position: "fixed",
          display: isOpen ? "flex" : "none",
          width: `100vw`,
          maxWidth: `100vw`,
          height: "100vh",
          maxHeight: "100vh",
          top: 0,
          left: 0,
          zIndex: 1,
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setIsOpen(false)}
      >
        {/* Modal Container */}
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
      </div>
    </>
  );
};
