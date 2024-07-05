import styled from "@emotion/styled";
import { FRET_COUNT, FRET_THICKNESS } from "../../Fretboard/consts";
import {
  calculateFretLength,
  percentOfNeckShown,
} from "../../Fretboard/Fret/Fret";
import { FretboardOrientation } from "../../Fretboard/Fretboard";
import { FRETBOARD_VIEWPORT_SIZE } from "./consts";

const guitarLengthwise = (): string => {
  return `[tuning] 30px [nut] 30px ${Array(FRET_COUNT)
    .fill(0)
    .map((_, index) => {
      const fret = index + 1;
      return `[fret-${fret}] ${
        Number(calculateFretLength(fret)) * (100 / percentOfNeckShown())
      }%`;
    })
    .join(" ")}`;
};

const guitarWidthwise = (tuning: number[]): string => {
  return `[fret-numbers] ${FRET_THICKNESS} ${tuning
    .map((_, index) => {
      const string = index + 1;
      return `[string-${string}] ${FRET_THICKNESS}`;
    })
    .join(" ")}`;
};

interface FretboardGridProps {
  orientation: FretboardOrientation;
  tuning: number[];
}

export const FretboardGrid = styled.div<FretboardGridProps>`
  ${({ orientation }) =>
    orientation === "Horizontal"
      ? `width: ${FRETBOARD_VIEWPORT_SIZE}vw;`
      : `height: ${FRETBOARD_VIEWPORT_SIZE}vh;`};
  ${({ orientation, tuning }) =>
    orientation === "Vertical"
      ? `width: ${FRET_THICKNESS * tuning.length}px;`
      : ""}

  display: grid;
  grid-template-columns: ${({ orientation, tuning }) =>
    orientation === "Horizontal"
      ? guitarLengthwise()
      : guitarWidthwise(tuning)};
  grid-template-columns: ${({ orientation, tuning }) =>
    orientation === "Vertical" ? guitarLengthwise() : guitarWidthwise(tuning)};

  /* debug */
  background-color: pink;
`;
