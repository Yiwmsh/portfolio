import styled from "@emotion/styled";
import React from "react";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "./FretboardDashboard";
import { FretboardNumbering } from "./FretboardNumbering";
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
  stringCount: number;
}

export interface FretboardProps {}

const FRETBOARD_VIEWPORT_SIZE = 70;

const FretboardStyle = styled.div<{
  orientation: FretboardOrientation;
  tuning: Note[];
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "column" : "row-reverse"};
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

export const Fretboard: React.FC<FretboardProps> = () => {
  const { tuning } = React.useContext(FretboardContext);
  const { status, data: settings } = useFretboardSettings();

  if (status !== "success" || settings == null) {
    return null;
  }

  return (
    <FretboardStyle
      orientation={settings.orientation}
      tuning={tuning}
    >
      <FretboardNumbering
        orientation={settings.orientation}
        settings={settings}
      />
      {tuning.map((note, index) => (
        <FretboardString
          key={`string-${index}`}
          settings={settings}
          stringNumber={index}
          stringNote={note}
        />
      ))}
    </FretboardStyle>
  );
};
