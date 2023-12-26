import { Interval } from "./Interval";
import { MusicalNumber } from "./types";

export type ChordStructure = MusicalNumber[];

const Fifth_Chord: ChordStructure = [Interval.Unison, Interval.Perfect_Fifth];

const Major_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Major_Third,
  Interval.Perfect_Fifth,
];

const Minor_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Minor_Third,
  Interval.Perfect_Fifth,
];

const Diminished_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Minor_Third,
  Interval.Tritone,
];

const Augmented_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Major_Third,
  Interval.Minor_Sixth,
];

const Major_Seventh_Chord: ChordStructure = [
  ...Major_Chord,
  Interval.Major_Seventh,
];

const Minor_Seventh_Chord: ChordStructure = [
  ...Minor_Chord,
  Interval.Minor_Seventh,
];

const Dominant_Seventh_Chord: ChordStructure = [
  ...Major_Chord,
  Interval.Minor_Seventh,
];

const Suspended_Second_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Major_Second,
  Interval.Perfect_Fifth,
];

const Suspended_Fourth_Chord: ChordStructure = [
  Interval.Unison,
  Interval.Perfect_Fourth,
  Interval.Perfect_Fifth,
];

export const Chords: { [chordName: string]: ChordStructure } = {
  "Fifth Chord": Fifth_Chord,
  "Major Chord": Major_Chord,
  "Minor Chord": Minor_Chord,
  "Diminished Chord": Diminished_Chord,
  "Augmented Chord": Augmented_Chord,
  "Major Seventh Chord": Major_Seventh_Chord,
  "Minor Seventh Chord": Minor_Seventh_Chord,
  "Dominant Seventh Chord": Dominant_Seventh_Chord,
  "Suspended Second Chord": Suspended_Second_Chord,
  "Suspended Fourth Chord": Suspended_Fourth_Chord,
} as const;
