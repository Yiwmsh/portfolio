import { Interval } from "../Interval";
import { AbstractMusicalStructure, TONES, Tone } from "../types";
import { keyToMode } from "./KeyUtilities";

export type AbstractMusicalKey = AbstractMusicalStructure;

export type MusicalKey = AbstractMusicalKey & {
  root: Tone;
  tones?: Tone[];
};

export const MAJOR_KEY: AbstractMusicalKey = {
  name: "Major",
  intervals: [
    Interval.Unison,
    Interval.Major_Second,
    Interval.Major_Third,
    Interval.Perfect_Fourth,
    Interval.Perfect_Fifth,
    Interval.Major_Sixth,
    Interval.Major_Seventh,
  ],
};

export const MINOR_KEY: AbstractMusicalKey = {
  name: "Minor",
  intervals: [
    Interval.Unison,
    Interval.Major_Second,
    Interval.Minor_Third,
    Interval.Perfect_Fourth,
    Interval.Perfect_Fifth,
    Interval.Minor_Sixth,
    Interval.Minor_Seventh,
  ],
};

export const CHROMATIC_KEY: MusicalKey = {
  name: "Chromatic",
  intervals: Array(TONES.length).fill(1),
  root: "C",
  tones: [...TONES],
};

export const MAJOR_PENTATONIC_KEY: AbstractMusicalKey = {
  name: "Major Pentatonic",
  intervals: [
    Interval.Unison,
    Interval.Major_Second,
    Interval.Major_Third,
    Interval.Perfect_Fifth,
    Interval.Major_Sixth,
  ],
};

export const MINOR_PENTATONIC_KEY: AbstractMusicalKey = {
  name: "Minor Pentatonic",
  intervals: [
    Interval.Unison,
    Interval.Minor_Third,
    Interval.Perfect_Fourth,
    Interval.Perfect_Fifth,
    Interval.Minor_Seventh,
  ],
};

export const MAJOR_PENTATONIC_BLUES_KEY: AbstractMusicalKey = {
  name: "Major Pentatonic Blues",
  intervals: [
    Interval.Unison,
    Interval.Major_Second,
    Interval.Perfect_Fourth,
    Interval.Perfect_Fifth,
    Interval.Major_Sixth,
  ],
};

export const SUSPENDED_PENTATONIC_KEY: AbstractMusicalKey = {
  name: "Suspended Pentatonic",
  intervals: [
    Interval.Unison,
    Interval.Major_Second,
    Interval.Perfect_Fourth,
    Interval.Perfect_Fifth,
    Interval.Minor_Seventh,
  ],
};

export const MINOR_PENTATONIC_BLUES_KEY: AbstractMusicalKey = {
  name: "Minor Pentatonic Blues",
  intervals: [
    Interval.Unison,
    Interval.Minor_Third,
    Interval.Perfect_Fourth,
    Interval.Minor_Sixth,
    Interval.Minor_Seventh,
  ],
};

export const Keys: { [keyName: string]: AbstractMusicalKey } = {
  Major: MAJOR_KEY,
  Minor: MINOR_KEY,
  Chromatic: CHROMATIC_KEY,
  "Major Pentatonic": MAJOR_PENTATONIC_KEY,
  "Major Pentatonic Blues": MAJOR_PENTATONIC_BLUES_KEY,
  "Minor Pentatonic": MINOR_PENTATONIC_KEY,
  "Minor Pentatonic Blues": MINOR_PENTATONIC_BLUES_KEY,
  "Suspended Pentatoncic": SUSPENDED_PENTATONIC_KEY,
  // Modes
  Ionian: {
    ...MAJOR_KEY,
    name: "Ionian",
  },
  Dorian: {
    ...keyToMode(MAJOR_KEY, 1),
    name: "Dorian",
  },
  Phyrgian: {
    ...keyToMode(MAJOR_KEY, 2),
    name: "Phyrgian",
  },
  Lydian: {
    ...keyToMode(MAJOR_KEY, 3),
    name: "Lydian",
  },
  Mixolydian: {
    ...keyToMode(MAJOR_KEY, 4),
    name: "Mixolydian",
  },
  Aeolian: {
    ...keyToMode(MAJOR_KEY, 5),
    name: "Aeolian",
  },
  Locrian: {
    ...keyToMode(MAJOR_KEY, 6),
    name: "Locrian",
  },
};
