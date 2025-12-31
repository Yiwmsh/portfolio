import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { DeckModal } from "./DeckModal";
import { HelpModal } from "./HelpModal/HelpModal";

const TopbarSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  margin: "0 3rem",
  alignItems: "center",
  gap: "1rem",
};

interface TopbarProps {}

export const ScryfallQuerierTopBar: React.FC<TopbarProps> = ({}) => {
  return (
    <>
      <div
        style={{
          background: `var(${SemanticColors.midground})`,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {/* Left Side */}
        <div style={TopbarSectionStyle}>
          <HelpModal />
        </div>
        <DeckModal />
        <div style={TopbarSectionStyle}>{/* Right side */}</div>
      </div>
    </>
  );
};
