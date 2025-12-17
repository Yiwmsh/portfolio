import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { DeckPicker } from "./DeckPicker";
import {
  useDeck,
  useDeckPickerStatus,
  useToggleDeckPickerStatus,
} from "./hooks/decks";
import { Deck } from "./types";

const HeaderSideSectionStyle: React.CSSProperties = {
  width: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
};

interface TopbarProps {
  selectedDeckGuid?: string;
  setSelectedDeckGuid: (newDeck?: string) => void;
}

export const ScryfallQuerierTopBar: React.FC<TopbarProps> = ({
  selectedDeckGuid,
  setSelectedDeckGuid,
}) => {
  const { data: selectedDeck, status: selectedDeckStatus } = useDeck(
    selectedDeckGuid ?? ""
  );

  if (selectedDeckStatus === "loading") {
    return null;
  }

  return (
    <>
      <div
        style={{
          background: `var(${SemanticColors.midground})`,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={HeaderSideSectionStyle} />
        <DeckSelectionModal
          selectedDeck={selectedDeck}
          selectedDeckGuid={selectedDeckGuid}
          setSelectedDeckGuid={setSelectedDeckGuid}
        />
        <div
          style={{
            ...HeaderSideSectionStyle,
          }}
        ></div>
      </div>
    </>
  );
};

interface DeckSelectionModalProps {
  selectedDeckGuid?: string;
  selectedDeck?: Deck;
  setSelectedDeckGuid: (newDeck?: string) => void;
}

const DeckSelectionModal: React.FC<DeckSelectionModalProps> = ({
  selectedDeckGuid,
  setSelectedDeckGuid,
  selectedDeck,
}) => {
  const { data: isOpen } = useDeckPickerStatus();
  const { mutate: toggleIsOpen } = useToggleDeckPickerStatus();

  return (
    <>
      <h1
        style={{
          cursor: "pointer",
        }}
        onClick={() => toggleIsOpen()}
      >
        {selectedDeck ? selectedDeck.name : "No Deck Selected"}
      </h1>
      <div
        style={{
          position: "fixed",
          display: isOpen ? "flex" : "none",
          width: isOpen ? "400px" : "0px",
          zIndex: 1,
          background: `var(${SemanticColors.midground})`,
          border: `1px solid var(${SemanticColors.primary})`,
          height: "100%",
        }}
      >
        <DeckPicker
          selectedDeck={selectedDeckGuid}
          onChange={(newDeck) => setSelectedDeckGuid(newDeck)}
        />
      </div>
    </>
  );
};
