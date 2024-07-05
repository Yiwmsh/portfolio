import { Button } from "@chrisellis/react-carpentry";
import React from "react";
import * as ToneJS from "tone";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { MusicalStructureList } from "../Displays/MusicalStructureList";
import { Barre, findBarreOnFret } from "../MusicTheory/Barres";
import { Chords } from "../MusicTheory/Chord/Chord";
import { Keys } from "../MusicTheory/Key/Key";
import {
  addSemitonesToFrequency,
  frequencyToNote,
  noteToFrequency,
} from "../MusicTheory/NoteUtilities";
import { STANDARD_TUNING } from "../MusicTheory/Tunings";
import { identifyPossibleStructures } from "../MusicTheory/identifyPossibleStructures";
import { Note, Tone } from "../MusicTheory/types";
import { FretboardOptions } from "./FretboardOptions";
import { FRET_COUNT } from "./consts";

export const FretboardContext = React.createContext<{
  selectedFrets: boolean[][];
  setSelectedFrets: React.Dispatch<React.SetStateAction<boolean[][]>>;
  clearSelectedFrets: () => void;
  ghostedFrets: boolean[][];
  setGhostedFrets: React.Dispatch<React.SetStateAction<boolean[][]>>;
  clearGhostedFrets: () => void;
  tuning: number[];
  setTuning: React.Dispatch<React.SetStateAction<number[]>>;
  sampler: ToneJS.Sampler;
  root?: Tone;
  setRoot: React.Dispatch<React.SetStateAction<Tone | undefined>>;
  possibleBarres: Barre[];
  barres: Barre[];
  setBarres: React.Dispatch<React.SetStateAction<Barre[]>>;
}>({
  selectedFrets: [],
  setSelectedFrets: () => {},
  clearSelectedFrets: () => {},
  ghostedFrets: [],
  setGhostedFrets: () => {},
  clearGhostedFrets: () => {},
  tuning: STANDARD_TUNING,
  setTuning: () => {},
  sampler: new ToneJS.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).toDestination(),
  setRoot: () => {},
  possibleBarres: [],
  barres: [],
  setBarres: () => {},
});

interface FretboardDashboardProps {
  children?: React.ReactNode;
}

export const FretboardDashboard: React.FC<FretboardDashboardProps> = ({
  children,
}) => {
  const [root, setRoot] = React.useState<Tone>();
  const { data: settings, status } = useFretboardSettings();
  const [tuning, setTuning] = React.useState<number[]>(STANDARD_TUNING);
  const [selectedFrets, setSelectedFrets] = React.useState<boolean[][]>(
    Array(tuning.length)
      .fill(0)
      .map((_) => Array(FRET_COUNT + 1).fill(false))
  );
  const [ghostedFrets, setGhostedFrets] = React.useState<boolean[][]>(
    Array(tuning.length)
      .fill(0)
      .map((_) => Array(FRET_COUNT + 1).fill(false))
  );

  const [barres, setBarres] = React.useState<Barre[]>([]);
  const possibleBarres: Barre[] = React.useMemo(() => {
    const fretsInUse: Set<number> = new Set();
    selectedFrets.forEach((guitarString) => {
      guitarString.forEach((fret, fretIndex) => {
        if (fret) {
          fretsInUse.add(fretIndex);
        }
      });
    });

    const possibleBarres: Barre[] = [];
    fretsInUse.forEach((fret) => {
      const barre = findBarreOnFret(selectedFrets, fret);
      if (barre !== false) {
        possibleBarres.push(barre);
      }
    });

    return possibleBarres;
  }, [selectedFrets]);

  const sampler = new ToneJS.Sampler({
    urls: {
      A1: "A1.mp3",
      A2: "A2.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/casio/",
  }).toDestination();

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
    return identifyPossibleStructures(selectedNotes, Chords);
  }, [selectedNotes]);

  const possibleKeys = React.useMemo(() => {
    return identifyPossibleStructures(selectedNotes, Keys);
  }, [selectedNotes]);

  React.useEffect(() => {
    if (selectedTones.length === 1) {
      setRoot(selectedTones[0]);
    } else if (selectedTones.length === 0) {
      setRoot(undefined);
    }
  }, [selectedTones]);

  if (status !== "success" || settings == null) {
    return <></>;
  }

  return (
    <>
      <FretboardContext.Provider
        value={{
          root,
          setRoot,
          sampler,
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
          ghostedFrets,
          setGhostedFrets,
          clearGhostedFrets: () => {
            setGhostedFrets(
              Array(tuning.length)
                .fill(0)
                .map((_) => Array(FRET_COUNT + 1).fill(false))
            );
          },
          possibleBarres,
          barres,
          setBarres,
        }}
      >
        <FretboardOptions />
        <>
          <Button
            onPress={() => {
              const selectedFrequencies = selectedNotes.map((note) =>
                noteToFrequency(note.tone, note.octave)
              );
              sampler.triggerAttack(selectedFrequencies);
            }}
          >
            Strum
          </Button>
          {children}
          {possibleChords.length > 0 && settings.selectionMode === "Chord" ? (
            <>
              <br />
              <MusicalStructureList
                structures={possibleChords}
                selectedTones={selectedTones}
              />
            </>
          ) : possibleKeys.length > 0 && settings.selectionMode === "Scale" ? (
            <>
              <br />
              <MusicalStructureList
                structures={possibleKeys}
                selectedTones={selectedTones}
              />
            </>
          ) : null}
        </>
      </FretboardContext.Provider>
    </>
  );
};
