import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";

const Spoiler = styled.p<{ revealed: boolean }>`
  display: inline-block;
  color: var(${SemanticColors.text});
  background-color: ${({ revealed }) =>
    revealed ? `var(${SemanticColors.shadow})` : `var(${SemanticColors.text})`};

  ${({ revealed }) => (revealed ? `` : `cursor: pointer;`)}
`;

export const RichTextSpoiler: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [revealed, setRevealed] = React.useState(false);
  return (
    <Spoiler
      revealed={revealed}
      onClick={() => setRevealed(true)}
    >
      {children}
    </Spoiler>
  );
};
