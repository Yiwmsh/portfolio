import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { DeckModal } from "./DeckModal";

interface TopbarProps {}

export const ScryfallQuerierTopBar: React.FC<TopbarProps> = ({}) => {
  return (
    <>
      <div
        style={{
          background: `var(${SemanticColors.midground})`,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <DeckModal />
      </div>
    </>
  );
};
