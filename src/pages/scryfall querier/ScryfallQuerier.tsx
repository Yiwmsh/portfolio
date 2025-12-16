import React from "react";
import { ScryfallQuerierView } from "./consts";
import { DeckPicker } from "./DeckPicker";
import { QueryEditorView } from "./QueryEditorView";
import { ScryfallQuerierTopBar } from "./ScryfallQuerierTopBar";

export const ScryfallQuerier: React.FC = () => {
  const [selectedDeckGuid, setSelectedDeckGuid] = React.useState<
    string | undefined
  >();
  const [view, setView] = React.useState<ScryfallQuerierView>("Decks");

  return (
    <div>
      <ScryfallQuerierTopBar
        selectedDeckGuid={selectedDeckGuid}
        setView={setView}
      />
      {view === "Decks" ? (
        <DeckPicker
          selectedDeck={selectedDeckGuid}
          onChange={(newDeck) => setSelectedDeckGuid(newDeck)}
        />
      ) : view === "Query" ? (
        <QueryEditorView selectedDeckGuid={selectedDeckGuid} />
      ) : null}
    </div>
  );
};
