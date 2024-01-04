import { FRET_COUNT } from "../../Fretboard/consts";
import {
  addSemitonesToFrequency,
  frequencyToNote,
  toneFrom,
} from "../NoteUtilities";
import { FretCoordinate, FrettingPattern, Tone } from "../types";
import { Chord } from "./Chord";

export const suggestChord = (
  frettedNotes: FrettingPattern,
  tuning: number[],
  chord: Chord,
  setSuggestion: (suggestedFrets: boolean[][]) => void
) => {
  const suggestedFrets: boolean[][] = Array(tuning.length)
    .fill(0)
    .map((_) => Array(FRET_COUNT + 1).fill(false));

  // Get the remaining tones needed to complete the chord.
  const targetTones = chord.intervals.map((interval) =>
    toneFrom(chord.root, interval)
  );

  setSuggestion(suggestedFrets);
};

const findPossibleChordPositions = (
  frettedNotes: { string: number; fret: number }[],
  tuning: number[],
  chord: Chord
): FrettingPattern[] => {
  const possibleFrettings: FrettingPattern[] = [];

  // First, get all the bare minimum versions of that chord. No duplicate notes.

  return possibleFrettings;
};

const findChordPositionsWithNFrets = (
  frettedNotes: { string: number; fret: number }[],
  tuning: number[],
  chord: Chord,
  maxFrettedNotes: number
): FrettingPattern[] => {
  if (maxFrettedNotes < chord.intervals.length) {
    // TODO write a function for simplifying a chord (Finding rootless / 5th-less voicings for example.)
    return [];
  }
  const possibleFrettings: FrettingPattern[] = [];

  // To keep things simple, a chord with barres can only span 3 fretlines, while a chord without barres can span 5.
  if (chord.intervals.length <= 4) {
    // Look for the simplest chord positions, without any extra techniques.
    // You only have 4 fingers, after all.
    const maxFretSpan = 4; // 5 inclusive, 4 exclusive. It's easier to add this way.
    for (
      let startingFret = 1;
      startingFret + maxFretSpan < FRET_COUNT;
      startingFret++
    ) {
      // TODO find tones in range.
    }
  }

  return possibleFrettings;
};

const findToneInRange = (
  tone: Tone,
  lowestFret: number,
  highestFret: number,
  tuning: number[]
): FretCoordinate[] => {
  const toneFrets: FretCoordinate[] = [];

  tuning.forEach((stringPitch, stringNumber) => {
    if (frequencyToNote(stringPitch).tone === tone) {
      toneFrets.push({ string: stringNumber, fret: 0 });
    }
    for (let fretNumber = lowestFret; fretNumber < highestFret; fretNumber++) {
      if (
        frequencyToNote(addSemitonesToFrequency(stringPitch, fretNumber))
          .tone === tone
      ) {
        toneFrets.push({ string: stringNumber, fret: fretNumber });
      }
    }
  });

  return toneFrets;
};
