import React from "react";
import { ScryfallQuerierTopBar } from "./ScryfallQuerierTopBar";
import { SearchView } from "./SearchView";

export const ScryfallQuerier: React.FC = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: "90vh",
      }}
    >
      <ScryfallQuerierTopBar />
      <SearchView />
    </div>
  );
};
