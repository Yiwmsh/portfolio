import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";

interface QueryTextDisplayProps {
  children?: React.ReactNode;
}

export const QueryTextDisplay: React.FC<QueryTextDisplayProps> = ({
  children,
}) => {
  return (
    <code
      // TODO Style this better
      style={{
        background: `var(${SemanticColors.shadow})`,
        padding: "2px 4px",
        borderRadius: "5px",
      }}
    >
      {children}
    </code>
  );
};
