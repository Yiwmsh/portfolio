import React from "react";
import { ScryfallQuerierView, VIEWS } from "./consts";
import { useDeck } from "./hooks/decks";

const HeaderSideSectionStyle: React.CSSProperties = {
  width: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
};

interface TopbarProps {
  selectedDeckGuid?: string;
  setView: (newView: ScryfallQuerierView) => void;
}

export const ScryfallQuerierTopBar: React.FC<TopbarProps> = ({
  selectedDeckGuid,
  setView,
}) => {
  const { data: selectedDeck, status: selectedDeckStatus } = useDeck(
    selectedDeckGuid ?? ""
  );

  if (selectedDeckStatus === "loading") {
    return null;
  }

  return (
    <div
      style={{
        position: "sticky",
        top: "0px",
        background: "pink",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={HeaderSideSectionStyle} />
      <h1>{selectedDeck ? selectedDeck.name : "No Deck Selected"}</h1>
      <div
        style={{
          ...HeaderSideSectionStyle,
        }}
      >
        {VIEWS.map((view) => (
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setView(view)}
          >
            <h3>{view}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};
