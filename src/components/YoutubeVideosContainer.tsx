import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";

const YoutubeVideoContainerStyle = styled(motion.div)<{ focussed: boolean }>`
  height: 70vh;
  display: flex;
  flex-direction: ${({ focussed }) => (focussed ? "row" : "column")};
  flex-wrap: ${({ focussed }) => (focussed ? "wrap" : "none")};
  overflow-x: scroll;

  align-content: start;

  padding: 10px;
  ${({ focussed }) =>
    focussed
      ? `
  justify-content: center;
  `
      : ""}
  gap: 5px;
  overflow-y: scroll;
  grid-row: 2;
  @media screen and (min-width: 600px) {
    grid-column: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
  }

  @media screen and (max-width: 600px) {
    grid-row: ${({ focussed }) => (focussed ? "2 / span 3" : "3")};
    height: 90%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  background-color: var(${SemanticColors.foreground});
  box-shadow: 0.125em 0.25em 1.25em var(--shadow-color);

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const YoutubeVideoContainer: React.FC<{
  children: React.ReactNode;
  focussed: boolean;
  onClick: () => void;
}> = ({ children, focussed, onClick }) => {
  return (
    <YoutubeVideoContainerStyle
      onClick={() => onClick}
      focussed={focussed}
    >
      {children}
    </YoutubeVideoContainerStyle>
  );
};
