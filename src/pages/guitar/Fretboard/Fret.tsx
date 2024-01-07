import { Color, SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import {
  addSemitonesToFrequency,
  frequencyToNote,
} from "../MusicTheory/NoteUtilities";
import {
  FretboardMode,
  FretboardOrientation,
  FretboardSettings,
} from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";
import {
  FRET_ACTIVE_BACKGROUND_COLOR,
  FRET_ACTIVE_BORDER_COLOR,
  FRET_COUNT,
  FRET_ROOT_BACKGROUND_COLOR,
  FRET_THICKNESS,
} from "./consts";

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
  position: relative;

  ${({ orientation }) =>
    `border-${orientation === "Horizontal" ? "left" : "top"}: 1px solid grey;`}
  ${({ orientation }) =>
    `border-${
      orientation === "Horizontal" ? "right" : "bottom"
    }: 1px solid grey;`};
`;

export const FretNote = styled.div<{
  backgroundColor?: Color;
  borderColor?: Color;
  textColor?: Color;
}>`
  position: absolute;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ?? FRET_ACTIVE_BACKGROUND_COLOR};
  color: ${({ textColor }) => textColor ?? `var(${SemanticColors.altText})`};
  border-radius: 100%;
  width: ${FRET_THICKNESS - 3}px;
  height: ${FRET_THICKNESS - 3}px;
  line-height: ${FRET_THICKNESS - 3}px;
  z-index: 2;
  text-align: center;
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : `none`};
`;

export const Fret: React.FC<FretProps> = ({
  settings,
  fretNumber,
  stringNote,
  stringNumber,
}) => {
  const {
    selectedFrets,
    setSelectedFrets,
    sampler,
    tuning,
    ghostedFrets,
    clearGhostedFrets,
    root,
    setRoot,
  } = React.useContext(FretboardContext);
  const fretFrequency = addSemitonesToFrequency(stringNote, fretNumber);
  const fretNote = frequencyToNote(fretFrequency);

  const { bottomHalfDot, topHalfDot } = React.useMemo(() => {
    const singleDottedFrets = [3, 5, 7, 9, 15, 17];

    if (fretNumber === 12) {
      if (stringNumber === 1 || stringNumber === tuning.length - 1) {
        return { bottomHalfDot: true, topHalfDot: false };
      } else if (stringNumber === 0 || stringNumber === tuning.length - 2) {
        return { bottomHalfDot: false, topHalfDot: true };
      }
    }

    if (singleDottedFrets.some((value) => value === fretNumber)) {
      if (tuning.length % 2 === 0) {
        // Even number of strings.
        // Single dot halves should be on the central two strings.
        const guitarUpperMiddle = tuning.length / 2;

        if (stringNumber === guitarUpperMiddle) {
          return { bottomHalfDot: true, topHalfDot: false };
        }

        if (stringNumber === guitarUpperMiddle - 1) {
          return { bottomHalfDot: false, topHalfDot: true };
        }
      }
    }

    return { bottomHalfDot: false, topHalfDot: false };
  }, [fretNumber, stringNumber, tuning.length]);

  return (
    <FretButton
      disabled={settings.mode === "Inert"}
      mode={settings.mode}
      fretNumber={fretNumber}
      orientation={settings.orientation}
      onContextMenu={(e) => {
        e.preventDefault();
        clearGhostedFrets();
        const newSelectedFrets = [...selectedFrets];
        newSelectedFrets[stringNumber][fretNumber] = true;
        setSelectedFrets(newSelectedFrets);
        setRoot(fretNote.tone);
      }}
      onClick={() => {
        clearGhostedFrets();
        const newSelectedFrets = [...selectedFrets];
        if (
          settings.selectionMode === "Chord" &&
          !selectedFrets[stringNumber][fretNumber]
        ) {
          newSelectedFrets[stringNumber] = newSelectedFrets[stringNumber].map(
            (fret) => false
          );
        }
        newSelectedFrets[stringNumber][fretNumber] =
          !selectedFrets[stringNumber][fretNumber];
        setSelectedFrets(newSelectedFrets);

        // Play a sound if the fret was just toggled on.
        if (
          settings.playbackOptions.onFretClick &&
          newSelectedFrets[stringNumber][fretNumber]
        ) {
          sampler.triggerAttack(fretFrequency);
        }
      }}
    >
      {selectedFrets[stringNumber][fretNumber] ? (
        <FretNote
          backgroundColor={
            root === fretNote.tone
              ? FRET_ROOT_BACKGROUND_COLOR
              : FRET_ACTIVE_BACKGROUND_COLOR
          }
          borderColor={FRET_ACTIVE_BORDER_COLOR}
        >
          {fretNote.tone}
        </FretNote>
      ) : ghostedFrets[stringNumber][fretNumber] ? (
        <FretNote
          backgroundColor={
            root === fretNote.tone ? FRET_ROOT_BACKGROUND_COLOR : `#21465e`
          }
        >
          {fretNote.tone}
        </FretNote>
      ) : null}
      {bottomHalfDot ? <BottomHalfDot /> : topHalfDot ? <TopHalfDot /> : null}
    </FretButton>
  );
};

const FretDotContainer = styled.svg`
  position: absolute;
`;

const BottomHalfDot: React.FC = () => {
  return (
    <FretDotContainer
      height={"100%"}
      width={"100%"}
    >
      <circle
        cx="50%"
        cy="0"
        r="7"
        stroke="white"
        stroke-width="3"
        fill="white"
      />
    </FretDotContainer>
  );
};

const TopHalfDot: React.FC = () => {
  return (
    <FretDotContainer
      height={"100%"}
      width={"100%"}
    >
      <circle
        cx="50%"
        cy="100%"
        r="7"
        stroke="white"
        stroke-width="3"
        fill="white"
      />
    </FretDotContainer>
  );
};
