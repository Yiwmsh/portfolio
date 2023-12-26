import { Chords } from "./Chord";
import { intervalBetween } from "./NoteUtilities";
import { MusicalNumber, Tone } from "./types";

export const IdentifyPossibleChordsFromNotes = (notes: Tone[]) => {
  // Make a set of discrete tones
  const tones = new Set<Tone>(notes);
  // Iterate through the tones in the chord, treating each as though it were the root.
  tones.forEach((rootTone) => {
    // Get each interval
    const intervals: MusicalNumber[] = [];
    tones.forEach((tone) => {
      intervals.push(intervalBetween(rootTone, tone));
    });
  });
};

export const IdentifyPossibleChordsFromIntervals = (
  intervals: MusicalNumber[]
) => {
  const possibleChords: string[] = [];
  // Get perfect matches
  Object.keys(Chords).forEach((chordKey) => {
    const chord = Chords[chordKey];
    if (
      chord.every((chordInterval) =>
        intervals.some((interval) => interval === chordInterval)
      )
    ) {
      possibleChords.push(chordKey);
    }
  });
  // TODO get imperfect matches

  return possibleChords;
};
