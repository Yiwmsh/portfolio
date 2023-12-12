import React from "react";
import { FretboardOptions } from "./FretboardOptions";
import { noteAt } from "./MusicTheory/NoteUtilities";
import { CHROMATIC_SCALE } from "./MusicTheory/Scale";
import { STANDARD_TUNING } from "./MusicTheory/Tunings";
import { MusicalNumber, NOTES, Note } from "./MusicTheory/types";
import { FRET_COUNT } from "./consts";

export const FretboardContext = React.createContext<{
  selectedFrets: boolean[][];
  setSelectedFrets: React.Dispatch<React.SetStateAction<boolean[][]>>;
  clearSelectedFrets: () => void;
  tuning: Note[];
  setTuning: React.Dispatch<React.SetStateAction<Note[]>>;
}>({
  selectedFrets: [],
  setSelectedFrets: () => {},
  clearSelectedFrets: () => {},
  tuning: STANDARD_TUNING.slice(0, 6),
  setTuning: () => {},
});

interface FretboardDashboardProps {
  children?: React.ReactNode;
}

export const FretboardDashboard: React.FC<FretboardDashboardProps> = ({
  children,
}) => {
  const [tuning, setTuning] = React.useState<Note[]>(
    STANDARD_TUNING.slice(0, 6)
  );
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
            noteAt(fretNumber, {
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
      <FretboardContext.Provider
        value={{
          tuning,
          setTuning,
          selectedFrets,
          setSelectedFrets,
          clearSelectedFrets: () => {
            setSelectedFrets(
              Array(tuning.length)
                .fill(0)
                .map((_) => Array(FRET_COUNT + 1).fill(false))
            );
          },
        }}
      >
        <FretboardOptions />
        Selected Notes: {selectedNotes.join(", ")}
        {children}
      </FretboardContext.Provider>
    </>
  );
};
