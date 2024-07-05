import { FRET_THICKNESS } from "../consts";
import { FretboardOrientation } from "../Fretboard";
import { calculateFretLength, percentOfNeckShown } from "./Fret";

export const fretSize = (
  orientation: FretboardOrientation,
  fretNumber: number
): string => {
  return `height: ${
    orientation === "Horizontal"
      ? `${FRET_THICKNESS}px`
      : `${
          Number(calculateFretLength(fretNumber)) * (100 / percentOfNeckShown())
        }%`
  };
      width: ${
        orientation === "Vertical"
          ? `${FRET_THICKNESS}px`
          : `${
              Number(calculateFretLength(fretNumber)) *
              (100 / percentOfNeckShown())
            }%`
      };`;
};

export const fretBorder = (orientation: FretboardOrientation): string => {
  return `
  border: none;
${`border-${orientation === "Horizontal" ? "left" : "top"}: 1px solid grey;`}
${`border-${
  orientation === "Horizontal" ? "right" : "bottom"
}: 1px solid grey;`};`;
};
