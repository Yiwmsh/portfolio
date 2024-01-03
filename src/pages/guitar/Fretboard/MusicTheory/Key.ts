import { Interval } from "./Interval";
import { TONES, Tone } from "./types";

export type AbstractMusicalKey = {
  name: string;
  intervals: Interval[];
};

export type MusicalKey = AbstractMusicalKey & {
  root: Tone;
  tones: Tone[];
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
