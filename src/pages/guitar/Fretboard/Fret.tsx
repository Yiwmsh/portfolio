import styled from "@emotion/styled";
import React from "react";
import { FretboardMode, FretboardOrientation } from "./Fretboard";
import { noteAt } from "./MusicTheory/NoteUtilities";
import { CHROMATIC_SCALE } from "./MusicTheory/Scale";
import { MusicalNumber, NOTES, Note } from "./MusicTheory/types";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

const percentOfNeckShown = () => {
  let totalFretLength = 0;

  Array(FRET_COUNT)
    .fill(0)
    .forEach(
      (_, index) =>
        (totalFretLength = totalFretLength + Number(calculateFretLength(index)))
    );

  return totalFretLength;
};

const calculateFretLength = (fretNumber: number) => {
  /*
  The formula for this calculation is based on the following article:
  https://johnsaucier.com/calculating-fret-positions
  */
  let positionOfPreviousFretWire: number = 1;

  let positionOfCurrentFretWire: number = 1;

  for (let i = 0; i < fretNumber; i++) {
    positionOfPreviousFretWire = positionOfCurrentFretWire;
    positionOfCurrentFretWire =
      positionOfPreviousFretWire / Math.pow(2, 1 / 12);
  }

  return (
    (positionOfPreviousFretWire - positionOfCurrentFretWire) *
    100
  ).toFixed(4);
};

export interface FretProps {
  mode: FretboardMode;
  fretNumber: number;
  orientation: FretboardOrientation;
  stringNote: Note;
  stringNumber: number;
  selectedFrets: boolean[][];
  setSelectedFrets: (selectedFrets: boolean[][]) => void;
}

const FretButton = styled.button<{
  mode: FretboardMode;
  fretNumber: number;
  orientation: FretboardOrientation;
  stringNumber: number;
}>`
  height: ${({ orientation, fretNumber }) =>
    orientation === "Horizontal"
      ? `${FRET_THICKNESS}px`
      : `${
          Number(calculateFretLength(fretNumber)) * (100 / percentOfNeckShown())
        }%`};
  width: ${({ orientation, fretNumber }) =>
    orientation === "Vertical"
      ? `${FRET_THICKNESS}px`
      : `${
          Number(calculateFretLength(fretNumber)) * (100 / percentOfNeckShown())
        }%`};
  background: transparent;
  border: none;
  cursor: ${({ mode }) => (mode === "Interactive" ? "pointer" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ orientation }) =>
    `border-${orientation === "Horizontal" ? "left" : "top"}: 1px solid grey;`}
  ${({ orientation }) =>
    `border-${
      orientation === "Horizontal" ? "right" : "bottom"
    }: 1px solid grey;`};
`;

const FretNote = styled.div`
  position: absolute;
  background-color: rgba(4, 59, 92, 1);
  color: white;
  border-radius: 100%;
  width: ${FRET_THICKNESS - 3}px;
  height: ${FRET_THICKNESS - 3}px;
  line-height: ${FRET_THICKNESS - 3}px;
  z-index: 2;
  text-align: center;
`;

export const Fret: React.FC<FretProps> = ({
  mode,
  fretNumber,
  orientation,
  stringNote,
  stringNumber,
  selectedFrets,
  setSelectedFrets,
}) => {
  const fretNote = noteAt(fretNumber, {
    root: NOTES.indexOf(stringNote) as MusicalNumber,
    scale: CHROMATIC_SCALE,
  });

  return (
    <FretButton
      disabled={mode === "Inert"}
      mode={mode}
      fretNumber={fretNumber}
      orientation={orientation}
      stringNumber={stringNumber}
      onClick={() => {
        const newSelectedFrets = [...selectedFrets];
        newSelectedFrets[stringNumber][fretNumber - 1] =
          !selectedFrets[stringNumber][fretNumber - 1];
        setSelectedFrets(newSelectedFrets);
      }}
    >
      {selectedFrets[stringNumber][fretNumber - 1] ? (
        <FretNote>{fretNote}</FretNote>
      ) : null}
    </FretButton>
  );
};

const WholeDot: React.FC = () => {
  return (
    <svg
      height="100"
      width="100"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="white"
        stroke-width="3"
        fill="white"
      />
    </svg>
  );
};

const HalfDot: React.FC = () => {
  return <></>;
};
