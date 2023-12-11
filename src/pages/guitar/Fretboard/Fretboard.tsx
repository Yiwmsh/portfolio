import styled from "@emotion/styled";
import React from "react";
import { FretboardString } from "./FretboardString";
import { noteAt } from "./MusicTheory/NoteUtilities";
import { CHROMATIC_SCALE } from "./MusicTheory/Scale";
import { MusicalNumber, NOTES, Note } from "./MusicTheory/types";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

export type FretboardMode = "Interactive" | "Inert";
export type FretboardOrientation = "Horizontal" | "Vertical";

export interface FretboardProps {
  mode: FretboardMode;
  orientation: FretboardOrientation;
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
  background-color: #595251;
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

export const Fretboard: React.FC<FretboardProps> = ({
  mode,
  orientation,
  tuning,
}) => {
  const [selectedFrets, setSelectedFrets] = React.useState<boolean[][]>(
    Array(tuning.length)
      .fill(0)
      .map((_) => Array(FRET_COUNT).fill(false))
  );

  const selectedNotes = React.useMemo(() => {
    const notesSet = new Set<Note>();
    selectedFrets.forEach((string, stringNumber) => {
      string.forEach((fret, fretNumber) => {
        if (fret) {
          notesSet.add(
            noteAt(fretNumber + 1, {
              root: NOTES.indexOf(tuning[stringNumber]) as MusicalNumber,
              scale: CHROMATIC_SCALE,
            })
          );
        }
      });
    });
    return Array.from(notesSet.values());
  }, [selectedFrets, tuning]);

  console.log(selectedFrets);
  return (
    <>
      <div>Selected Notes: {selectedNotes.join(", ")}</div>
      <FretboardStyle
        orientation={orientation}
        tuning={tuning}
      >
        {tuning.map((note, index) => (
          <FretboardString
            mode={mode}
            stringNumber={index}
            orientation={orientation}
            stringNote={note}
            selectedFrets={selectedFrets}
            setSelectedFrets={setSelectedFrets}
          />
        ))}
      </FretboardStyle>
    </>
  );
};
