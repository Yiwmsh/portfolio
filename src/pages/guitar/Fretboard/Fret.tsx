import styled from "@emotion/styled";
import React from "react";
import {
  FretboardMode,
  FretboardOrientation,
  FretboardSettings,
} from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";
import {
  addSemitonesToFrequency,
  frequencyToNote,
} from "./MusicTheory/NoteUtilities";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

export const percentOfNeckShown = () => {
  let totalFretLength = 0;

  Array(FRET_COUNT)
    .fill(0)
    .forEach(
      (_, index) =>
        (totalFretLength = totalFretLength + Number(calculateFretLength(index)))
    );

  return totalFretLength;
};

export const calculateFretLength = (fretNumber: number) => {
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
  settings: FretboardSettings;
  fretNumber: number;
  stringNote: number;
  stringNumber: number;
}

export const FretButton = styled.button<{
  mode: FretboardMode;
  fretNumber: number;
  orientation: FretboardOrientation;
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
  background-color: #595251;
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

export const FretNote = styled.div`
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
  settings,
  fretNumber,
  stringNote,
  stringNumber,
}) => {
  const { selectedFrets, setSelectedFrets } =
    React.useContext(FretboardContext);
  const fretNote = frequencyToNote(
    addSemitonesToFrequency(stringNote, fretNumber)
  );

  return (
    <FretButton
      disabled={settings.mode === "Inert"}
      mode={settings.mode}
      fretNumber={fretNumber}
      orientation={settings.orientation}
      onClick={() => {
        const newSelectedFrets = [...selectedFrets];
        if (
          settings.selectionMode === "Single" &&
          !selectedFrets[stringNumber][fretNumber]
        ) {
          newSelectedFrets[stringNumber] = newSelectedFrets[stringNumber].map(
            (fret) => false
          );
        }
        newSelectedFrets[stringNumber][fretNumber] =
          !selectedFrets[stringNumber][fretNumber];
        setSelectedFrets(newSelectedFrets);
      }}
    >
      {selectedFrets[stringNumber][fretNumber] ? (
        <FretNote>{fretNote.tone}</FretNote>
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
