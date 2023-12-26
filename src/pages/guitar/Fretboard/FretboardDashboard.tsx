import React from "react";
import { FretboardOptions } from "./FretboardOptions";
import { Interval } from "./MusicTheory/Interval";
import {
  addSemitonesToFrequency,
  frequencyToNote,
  intervalBetween,
} from "./MusicTheory/NoteUtilities";
import { STANDARD_TUNING } from "./MusicTheory/Tunings";
import { Note } from "./MusicTheory/types";
import { FRET_COUNT } from "./consts";

export const FretboardContext = React.createContext<{
  selectedFrets: boolean[][];
  setSelectedFrets: React.Dispatch<React.SetStateAction<boolean[][]>>;
  clearSelectedFrets: () => void;
  tuning: number[];
  setTuning: React.Dispatch<React.SetStateAction<number[]>>;
}>({
  selectedFrets: [],
  setSelectedFrets: () => {},
  clearSelectedFrets: () => {},
  tuning: STANDARD_TUNING,
  setTuning: () => {},
});

interface FretboardDashboardProps {
  children?: React.ReactNode;
}

export const FretboardDashboard: React.FC<FretboardDashboardProps> = ({
  children,
}) => {
  const [tuning, setTuning] = React.useState<number[]>(STANDARD_TUNING);
  const [selectedFrets, setSelectedFrets] = React.useState<boolean[][]>(
    Array(tuning.length)
      .fill(0)
      .map((_) => Array(FRET_COUNT + 1).fill(false))
  );

  // TODO
  const selectedNotes = React.useMemo(() => {
    const notesSet = new Set<Note>();
    selectedFrets.forEach((string, stringNumber) => {
      const stringPitch = tuning[stringNumber];
      string.forEach((fret, fretNumber) => {
        if (fret) {
          const fretPitch = addSemitonesToFrequency(stringPitch, fretNumber);
          notesSet.add(frequencyToNote(fretPitch));
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
        <>
          Selected Notes:{" "}
          {selectedNotes.map((note) => note.tone + note.octave).join(", ")}
          <br />
          {selectedNotes.length === 2
            ? `Interval: ${Interval[
                intervalBetween(selectedNotes[0].tone, selectedNotes[1].tone)
              ].replaceAll("_", " ")}`
            : null}
          {children}
        </>
      </FretboardContext.Provider>
    </>
  );
};
