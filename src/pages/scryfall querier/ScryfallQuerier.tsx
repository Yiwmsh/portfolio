import React from "react";
import { QueryEditorView } from "./QueryEditorView";
import { ScryfallQuerierTopBar } from "./ScryfallQuerierTopBar";

export const ScryfallQuerier: React.FC = () => {
  const [selectedDeckGuid, setSelectedDeckGuid] = React.useState<
    string | undefined
  >();

  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: "90vh",
      }}
    >
      <ScryfallQuerierTopBar
        selectedDeckGuid={selectedDeckGuid}
        setSelectedDeckGuid={setSelectedDeckGuid}
      />
      <QueryEditorView selectedDeckGuid={selectedDeckGuid} />
    </div>
  );
};
