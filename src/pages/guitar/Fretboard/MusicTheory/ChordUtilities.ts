import { Chord, ChordArchetype, Chords } from "./Chord";
import { intervalBetween } from "./NoteUtilities";
import { MusicalNumber, Note, Tone } from "./types";

export const IdentifyPossibleChordsFromNotes = (notes: Note[]) => {
  const possibleChords: Set<Chord> = new Set<Chord>();
  // Make a set of discrete tones
  const toneSet = new Set<Tone>(notes.map((note) => note.tone));
  // Iterate through the tones in the chord, treating each as though it were the root.
  toneSet.forEach((rootTone) => {
    // Get each interval
    const intervals: MusicalNumber[] = [];
    toneSet.forEach((tone) => {
      intervals.push(intervalBetween(rootTone, tone));
    });
    const possibleChordsWithRootN =
      IdentifyPossibleChordsFromIntervals(intervals);
    possibleChordsWithRootN.forEach((chord) => {
      possibleChords.add({ ...chord, root: rootTone });
    });
  });

  return Array.from(possibleChords.values());
};

export const IdentifyPossibleChordsFromIntervals = (
  intervals: MusicalNumber[]
) => {
  const possibleChords: ChordArchetype[] = [];
  // Get perfect matches
  Object.keys(Chords).forEach((chordKey) => {
    const chord = Chords[chordKey];
    if (
      intervals.length === chord.structure.length &&
      intervals.every((interval) =>
        chord.structure.some((chordInterval) => interval === chordInterval)
      )
    ) {
      possibleChords.push(Chords[chordKey]);
    }
  });
  // TODO match extended chords
  // TODO get imperfect matches

  return possibleChords;
};
