import styled from "@emotion/styled";
import React from "react";
import { FretboardString } from "./FretboardString";
import { Note } from "./MusicTheory/types";
import { FRET_THICKNESS } from "./consts";

export type FretboardMode = "Interactive" | "Inert";
export type FretboardOrientation = "Horizontal" | "Vertical";
export type FretSelectionMode = "Single" | "Multiple";

export interface FretboardSettings {
  mode: FretboardMode;
  orientation: FretboardOrientation;
  selectionMode: FretSelectionMode;
}

export interface FretboardProps {
  settings: FretboardSettings;
  tuning: Note[];
}

const FRETBOARD_VIEWPORT_SIZE = 70;

const FretboardStyle = styled.div<{
  orientation: FretboardOrientation;
  tuning: Note[];
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "column" : "row"};
  margin: auto;
  ${({ orientation }) =>
    orientation === "Horizontal"
      ? `width: ${FRETBOARD_VIEWPORT_SIZE}vw`
      : `height: ${FRETBOARD_VIEWPORT_SIZE}vh`};
  ${({ orientation, tuning }) =>
    orientation === "Vertical"
      ? `width: ${FRET_THICKNESS * tuning.length}px;`
      : ""}
`;

export const Fretboard: React.FC<FretboardProps> = ({ settings, tuning }) => {
  return (
    <FretboardStyle
      orientation={settings.orientation}
      tuning={tuning}
    >
      {tuning.map((note, index) => (
        <FretboardString
          settings={settings}
          stringNumber={index}
          stringNote={note}
        />
      ))}
    </FretboardStyle>
  );
};
