import styled from "@emotion/styled";
import { calculateFretLength, percentOfNeckShown } from "./Fret";
import { FretboardOrientation } from "./Fretboard";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

const FretboardNumberingContainer = styled.div<{
  orientation: FretboardOrientation;
}>`
  box-sizing: border-box;
  ${({ orientation }) =>
    `${orientation === "Horizontal" ? "width" : "height"}: 100%;`}
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "row" : "column"};
  ${({ orientation }) =>
    `padding-${
      orientation === "Horizontal" ? "left" : "top"
    }: calc(30px + 4px);`}
`;

const FretboardNumber = styled.div<{
  orientation: FretboardOrientation;
  fretNumber: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ orientation, fretNumber }) =>
    orientation === "Horizontal"
      ? `${FRET_THICKNESS}px`
      : fretNumber === 0
      ? "30px"
      : `${
          Number(calculateFretLength(fretNumber)) * (100 / percentOfNeckShown())
        }%`};
  width: ${({ orientation, fretNumber }) =>
    orientation === "Vertical"
      ? `${FRET_THICKNESS}px`
      : fretNumber === 0
      ? "30px"
      : `${
          Number(calculateFretLength(fretNumber)) * (100 / percentOfNeckShown())
        }%`};
`;

interface FretboardNumberProps {
  orientation: FretboardOrientation;
}

export const FretboardNumbering: React.FC<FretboardNumberProps> = ({
  orientation,
}) => {
  return (
    <FretboardNumberingContainer orientation={orientation}>
      {Array(FRET_COUNT)
        .fill(0)
        .map((_, index) => (
          <FretboardNumber
            orientation={orientation}
            fretNumber={index}
            key={`fretNumbering-${index}`}
          >
            {index}
          </FretboardNumber>
        ))}
    </FretboardNumberingContainer>
  );
};
