import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { DeckPicker } from "./DeckPicker";
import { QueryModifiersView } from "./QueryModifiers/QueryModifiersView";
import { useSelectedDeck } from "./hooks/decks";
import { useSiteSetting } from "./hooks/siteSettings";

const HeaderSideSectionStyle: React.CSSProperties = {
  width: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
};

interface TopbarProps {}

export const ScryfallQuerierTopBar: React.FC<TopbarProps> = ({}) => {
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
        <DeckSelectionModal />
        <div
          style={{
            ...HeaderSideSectionStyle,
          }}
        >
          <QueryModifiersView />
        </div>
      </div>
    </>
  );
};

const DeckSelectionModal: React.FC = () => {
  const { settingValue: isOpen, toggleSetting: toggleIsOpen } =
    useSiteSetting("deck picker status");

  const { data: { selectedDeck } = {} } = useSelectedDeck();

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
        <DeckPicker />
      </div>
    </>
  );
};
