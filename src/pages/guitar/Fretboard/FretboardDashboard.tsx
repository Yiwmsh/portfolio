import React from "react";
import { FretboardOptions } from "./FretboardOptions";
import { IdentifyPossibleChordsFromNotes } from "./MusicTheory/ChordUtilities";
import {
  addSemitonesToFrequency,
  frequencyToNote,
} from "./MusicTheory/NoteUtilities";
import { STANDARD_TUNING } from "./MusicTheory/Tunings";
import { Note, Tone } from "./MusicTheory/types";
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
  const { selectedNotes, selectedTones } = React.useMemo(() => {
    const notesSet = new Set<Note>();
    const toneSet = new Set<Tone>();
    selectedFrets.forEach((string, stringNumber) => {
      const stringPitch = tuning[stringNumber];
      string.forEach((fret, fretNumber) => {
        if (fret) {
          const fretNote = frequencyToNote(
            addSemitonesToFrequency(stringPitch, fretNumber)
          );
          notesSet.add(fretNote);
          toneSet.add(fretNote.tone);
        }
      });
    });
    return {
      selectedNotes: Array.from(notesSet.values()),
      selectedTones: Array.from(toneSet.values()),
    };
  }, [selectedFrets, tuning]);

  const possibleChords = React.useMemo(() => {
    return IdentifyPossibleChordsFromNotes(selectedNotes);
  }, [selectedNotes]);

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
          {children}
          Selected Notes:{" "}
          {selectedNotes.map((note) => note.tone + note.octave).join(", ")}
          {possibleChords.length > 0 ? (
            <>
              <br />
              {`Possible Chords: ${possibleChords
                .map((chord) => chord.root + " " + chord.shortHand)
                .join(", ")}`}
            </>
          ) : null}
        </>
      </FretboardContext.Provider>
    </>
  );
};
