import styled from "@emotion/styled";
import React from "react";
import { Fret, FretNote } from "./Fret";
import {
  FretboardMode,
  FretboardOrientation,
  FretboardSettings,
} from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";
import { Note } from "./MusicTheory/types";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

export interface FretboardStringProps {
  settings: FretboardSettings;
  stringNumber: number;
  stringNote: Note;
}
const FretboardStringStyle = styled.div<{
  orientation: FretboardOrientation;
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "row" : "column"};
  position: relative;
`;

const VisibleString = styled.span<{
  orientation: FretboardOrientation;
}>`
  position: absolute;
  z-index: 0;
  background-color: black;
  ${({ orientation }) =>
    orientation === "Horizontal" ? "height: 1px" : "width: 1px"};
  ${({ orientation }) =>
    orientation === "Horizontal" ? "width: 100%" : "height: 100%"};
  align-self: center;
`;

const GuitarNut = styled.button<{
  mode: FretboardMode;
  orientation: FretboardOrientation;
}>`
  background: transparent;
  border: none;
  cursor: ${({ mode }) => (mode === "Interactive" ? "pointer" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ orientation }) =>
    orientation === "Horizontal" ? FRET_THICKNESS : "50px"};
  width: ${({ orientation }) =>
    orientation === "Vertical" ? FRET_THICKNESS : "50px"};
`;

export const FretboardString: React.FC<FretboardStringProps> = ({
  stringNumber,
  stringNote,
  settings,
}) => {
  const { selectedFrets, setSelectedFrets } =
    React.useContext(FretboardContext);
  return (
    <FretboardStringStyle orientation={settings.orientation}>
      <GuitarNut
        disabled={settings.mode === "Inert"}
        orientation={settings.orientation}
        mode={settings.mode}
        onClick={() => {
          const newSelectedFrets = selectedFrets.map((string) => [...string]);
          if (
            settings.selectionMode === "Single" &&
            !selectedFrets[stringNumber][0]
          ) {
            newSelectedFrets[stringNumber] = newSelectedFrets[stringNumber].map(
              (fret) => false
            );
          }
          newSelectedFrets[stringNumber][0] = !selectedFrets[stringNumber][0];
          setSelectedFrets(newSelectedFrets);
        }}
      >
        {selectedFrets[stringNumber][0] ? (
          <FretNote>{stringNote}</FretNote>
        ) : null}
      </GuitarNut>
      {Array(FRET_COUNT)
        .fill(0)
        .map((_, index) => (
          <Fret
            settings={settings}
            fretNumber={index + 1}
            stringNote={stringNote}
            stringNumber={stringNumber}
          />
        ))}
      <VisibleString orientation={settings.orientation} />
    </FretboardStringStyle>
  );
};
