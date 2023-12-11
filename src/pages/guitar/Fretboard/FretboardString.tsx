import styled from "@emotion/styled";
import { Fret } from "./Fret";
import { FretboardMode, FretboardOrientation } from "./Fretboard";
import { Note } from "./MusicTheory/types";
import { FRET_COUNT } from "./consts";

export interface FretboardStringProps {
  mode: FretboardMode;
  stringNumber: number;
  orientation: FretboardOrientation;
  stringNote: Note;
  selectedFrets: boolean[][];
  setSelectedFrets: (selectedFrets: boolean[][]) => void;
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

export const FretboardString: React.FC<FretboardStringProps> = ({
  mode,
  stringNumber,
  orientation,
  stringNote,
  selectedFrets,
  setSelectedFrets,
}) => {
  return (
    <FretboardStringStyle orientation={orientation}>
      {Array(FRET_COUNT)
        .fill(0)
        .map((_, index) => (
          <Fret
            mode={mode}
            fretNumber={index + 1}
            stringNote={stringNote}
            orientation={orientation}
            stringNumber={stringNumber}
            selectedFrets={selectedFrets}
            setSelectedFrets={setSelectedFrets}
          />
        ))}
      <VisibleString orientation={orientation} />
    </FretboardStringStyle>
  );
};
