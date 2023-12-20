import { Note } from "./types";

export const STANDARD_TUNING: Note[] = [
  "E",
  "B",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
];

export const DROP_D_TUNING: Note[] = ["E", "B", "G", "D", "A", "D"];

export const CELTIC_TUNING: Note[] = ["D", "A", "G", "D", "A", "D"];

export const TUNINGS: { [name: string]: Note[] } = {
  Standard: STANDARD_TUNING,
  Drop_d: DROP_D_TUNING,
  Celtic: CELTIC_TUNING,
};
