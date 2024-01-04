import { mod } from "../../../../utils/mod";
import { FRET_COUNT } from "../../Fretboard/consts";
import { Interval } from "../Interval";
import {
  addSemitonesToFrequency,
  frequencyToNote,
  toneFrom,
} from "../NoteUtilities";
import { keyToScale, scaleInKey, scaleToMode } from "../Scale/ScaleUtils";
import { Tone } from "../types";
import { AbstractMusicalKey, MusicalKey } from "./Key";

export const scaleToKey = (scaleIntervals: Interval[]): Interval[] => {
  const keyIntervals: Interval[] = [0];

  scaleIntervals.forEach((scaleInterval, index) => {
    const interval = mod(keyIntervals[index] + scaleInterval, 12);
    if (!keyIntervals.some((keyInterval) => keyInterval === interval)) {
      keyIntervals.push(interval);
    }
  });

  return keyIntervals;
};

export const keyToMode = (
  key: AbstractMusicalKey,
  mode: number
): AbstractMusicalKey => {
  const sequence = keyToScale(key.intervals);
  const modeSequence = scaleToMode(sequence, mode);
  return {
    ...key,
    intervals: scaleToKey(modeSequence),
  };
};

export const keyOf = (key: AbstractMusicalKey, root: Tone): MusicalKey => {
  return { ...key, root, tones: scaleInKey(keyToScale(key.intervals), root) };
};

export const suggestKey = (
  tuning: number[],
  key: MusicalKey,
  setSuggestion: (suggestedFrets: boolean[][]) => void
) => {
  const suggestedFrets: boolean[][] = Array(tuning.length)
    .fill(0)
    .map((_) => Array(FRET_COUNT + 1).fill(false));

  // Get the remaining tones needed to complete the chord.
  const targetTones = key.intervals.map((interval) =>
    toneFrom(key.root, interval)
  );

  suggestedFrets.forEach((string, stringNumber) => {
    string.forEach((fret, fretNumber) => {
      const fretTone = frequencyToNote(
        addSemitonesToFrequency(tuning[stringNumber], fretNumber)
      ).tone;
      if (targetTones.some((targetTone) => targetTone === fretTone)) {
        suggestedFrets[stringNumber][fretNumber] = true;
      }
    });
  });

  setSuggestion(suggestedFrets);
};
