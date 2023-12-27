import { Interval } from "./Interval";
import { MusicalNumber, Tone } from "./types";

export type ChordStructure = MusicalNumber[];

export type ChordArchetype = {
  structure: ChordStructure;
  shortHand: string;
};

export type Chord = ChordArchetype & {
  root: Tone;
};

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

export const Chords: { [chordName: string]: ChordArchetype } = {
  "Fifth Chord": { structure: Fifth_Chord, shortHand: "5" },
  "Major Chord": { structure: Major_Chord, shortHand: "major" },
  "Minor Chord": { structure: Minor_Chord, shortHand: "minor" },
  "Diminished Chord": { structure: Diminished_Chord, shortHand: "dim" },
  "Augmented Chord": { structure: Augmented_Chord, shortHand: "aug" },
  "Major Seventh Chord": { structure: Major_Seventh_Chord, shortHand: "maj7" },
  "Minor Seventh Chord": { structure: Minor_Seventh_Chord, shortHand: "m7" },
  "Dominant Seventh Chord": {
    structure: Dominant_Seventh_Chord,
    shortHand: "7",
  },
  "Suspended Second Chord": {
    structure: Suspended_Second_Chord,
    shortHand: "sus2",
  },
  "Suspended Fourth Chord": {
    structure: Suspended_Fourth_Chord,
    shortHand: "sus4",
  },
} as const;
