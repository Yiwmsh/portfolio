import React from "react";
import { NAVBAR_HEIGHT_VAR_NAME } from "../SiteNavbar";
import { ScryfallQuerierTopBar } from "./ScryfallQuerierTopBar";
import { SearchView } from "./SearchView";

export const ScryfallQuerier: React.FC = () => {
  return (
    <div
      style={{
        overflow: "hidden",
        height: `calc(100vh - var(${NAVBAR_HEIGHT_VAR_NAME}))`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <ScryfallQuerierTopBar />
      <SearchView />
    </div>
  );
};
