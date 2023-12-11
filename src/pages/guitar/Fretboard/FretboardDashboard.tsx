import React from "react";
import { FretboardOptions } from "./FretboardOptions";
import { noteAt } from "./MusicTheory/NoteUtilities";
import { CHROMATIC_SCALE } from "./MusicTheory/Scale";
import { MusicalNumber, NOTES, Note } from "./MusicTheory/types";
import { FRET_COUNT } from "./consts";

export const FretboardContext = React.createContext<{
  selectedFrets: boolean[][];
  setSelectedFrets: React.Dispatch<React.SetStateAction<boolean[][]>>;
}>({
  selectedFrets: [],
  setSelectedFrets: () => {},
});

interface FretboardDashboardProps {
  tuning: Note[];
  children?: React.ReactNode;
}

export const FretboardDashboard: React.FC<FretboardDashboardProps> = ({
  tuning,
  children,
}) => {
  const [selectedFrets, setSelectedFrets] = React.useState<boolean[][]>(
    Array(tuning.length)
      .fill(0)
      .map((_) => Array(FRET_COUNT + 1).fill(false))
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

  return (
    <>
      <FretboardOptions />
      Selected Notes: {selectedNotes.join(", ")}
      <FretboardContext.Provider value={{ selectedFrets, setSelectedFrets }}>
        {children}
      </FretboardContext.Provider>
    </>
  );
};
