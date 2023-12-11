import { Scale } from "./Scale";

export const NOTE_LETTERS = ["A", "B", "C", "D", "E", "F", "G"] as const;

export type NoteLetter = (typeof NOTE_LETTERS)[number];

export const NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;

export type Note = (typeof NOTES)[number];

export type MusicalNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MusicalKey = {
  root: MusicalNumber;
  scale: Scale;
};
