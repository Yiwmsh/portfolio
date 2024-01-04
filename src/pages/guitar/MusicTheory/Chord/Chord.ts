import { Interval } from "../Interval";
import { AbstractMusicalStructure, MusicalNumber, Tone } from "../types";

export type ChordStructure = MusicalNumber[];

export type ChordArchetype = AbstractMusicalStructure;

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

const Dominant_Ninth_Chord: ChordStructure = [
  ...Dominant_Seventh_Chord,
  Interval.Major_Second,
];

const Dominant_Minor_Ninth_Chord: ChordStructure = [
  ...Dominant_Seventh_Chord,
  Interval.Minor_Second,
];

const Minor_Ninth_Chord: ChordStructure = [
  ...Minor_Seventh_Chord,
  Interval.Major_Second,
];

const Major_Ninth_Chord: ChordStructure = [
  ...Major_Seventh_Chord,
  Interval.Major_Second,
];

const Dominant_Seventh_Suspended_Fourth_Chord: ChordStructure = [
  ...Suspended_Fourth_Chord,
  Interval.Minor_Seventh,
];

const Dominant_Eleventh_Chord: ChordStructure = [
  ...Dominant_Ninth_Chord,
  Interval.Perfect_Fourth,
];

const Minor_Eleventh_Chord: ChordStructure = [
  ...Minor_Ninth_Chord,
  Interval.Perfect_Fourth,
];

const Major_Eleventh_Chord: ChordStructure = [
  ...Major_Ninth_Chord,
  Interval.Perfect_Fourth,
];

export const Chords: { [chordName: string]: ChordArchetype } = {
  "Fifth Chord": {
    intervals: Fifth_Chord,
    shortHand: "5",
    name: "Fifth Chord",
  },
  "Major Chord": {
    intervals: Major_Chord,
    shortHand: "major",
    name: "Major Chord",
  },
  "Minor Chord": {
    intervals: Minor_Chord,
    shortHand: "minor",
    name: "Minor Chord",
  },
  "Diminished Chord": {
    intervals: Diminished_Chord,
    shortHand: "dim",
    name: "Diminished Chord",
  },
  "Augmented Chord": {
    intervals: Augmented_Chord,
    shortHand: "aug",
    name: "Augmented Chord",
  },
  "Major Seventh Chord": {
    intervals: Major_Seventh_Chord,
    shortHand: "maj7",
    name: "Major Seventh Chord",
  },
  "Minor Seventh Chord": {
    intervals: Minor_Seventh_Chord,
    shortHand: "m7",
    name: "Minor Seventh Chord",
  },
  "Dominant Seventh Chord": {
    intervals: Dominant_Seventh_Chord,
    shortHand: "7",
    name: "Dominant Seventh Chord",
  },
  "Suspended Second Chord": {
    intervals: Suspended_Second_Chord,
    shortHand: "sus2",
    name: "Suspended Second Chord",
  },
  "Suspended Fourth Chord": {
    intervals: Suspended_Fourth_Chord,
    shortHand: "sus4",
    name: "Suspended Fourth Chord",
  },
  "Dominant Ninth Chord": {
    intervals: Dominant_Ninth_Chord,
    shortHand: "9",
    name: "Dominant Ninth Chord",
  },
  "Dominant Minor Ninth Chord": {
    intervals: Dominant_Minor_Ninth_Chord,
    shortHand: "7b9",
    name: "Dominant Minor Ninth Chord",
  },
  "Minor Ninth Chord": {
    intervals: Minor_Ninth_Chord,
    shortHand: "m9",
    name: "Minor Ninth Chord",
  },
  "Major Ninth Chord": {
    intervals: Major_Ninth_Chord,
    shortHand: "M9",
    name: "Major Ninth Chord",
  },
  "Seven Sus Four Chord": {
    intervals: Dominant_Seventh_Suspended_Fourth_Chord,
    shortHand: "7sus4",
    name: "Seven Sus Four Chord",
  },
  "Dominant Eleventh Chord": {
    intervals: Dominant_Eleventh_Chord,
    shortHand: "11",
    name: "Dominant Eleventh Chord",
  },
  "Minor Eleventh Chord": {
    intervals: Minor_Eleventh_Chord,
    shortHand: "m11",
    name: "Minor Eleventh Chord",
  },
  "Major Eleventh Chord": {
    intervals: Major_Eleventh_Chord,
    shortHand: "M11",
    name: "Major Eleventh Chord",
  },
};
