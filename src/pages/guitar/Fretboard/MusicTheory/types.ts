import { Scale } from "./Scale";

export const TONE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const;

export type ToneLetter = (typeof TONE_LETTERS)[number];

export const TONES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type Tone = (typeof TONES)[number];

export type MusicalNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type MusicalKey = {
  root: MusicalNumber;
  scale: Scale;
};

export enum Frequencies {
  C = 16.35,
  C_Sharp = 17.32,
  D = 18.35,
  D_Sharp = 19.45,
  E = 20.6,
  F = 21.83,
  F_Sharp = 23.12,
  G = 24.5,
  G_Sharp = 51.91,
  A = 27.5,
  A_Sharp = 58.27,
  B = 30.87,
}

export type Note = {
  tone: Tone;
  octave: number;
};
