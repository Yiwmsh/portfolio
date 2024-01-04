import { noteToFrequency } from "./NoteUtilities";

export const STANDARD_TUNING: number[] = [
  noteToFrequency("E", 4),
  noteToFrequency("B", 3),
  noteToFrequency("G", 3),
  noteToFrequency("D", 3),
  noteToFrequency("A", 2),
  noteToFrequency("E", 2),
];

export const DROP_D_TUNING: number[] = [
  noteToFrequency("E", 4),
  noteToFrequency("B", 3),
  noteToFrequency("G", 3),
  noteToFrequency("D", 3),
  noteToFrequency("A", 2),
  noteToFrequency("D", 2),
];

export const OPEN_D_TUNING: number[] = [
  noteToFrequency("D", 4),
  noteToFrequency("A", 3),
  noteToFrequency("F#", 3),
  noteToFrequency("D", 3),
  noteToFrequency("A", 2),
  noteToFrequency("D", 2),
];

export const OPEN_C_TUNING: number[] = [
  noteToFrequency("E", 4),
  noteToFrequency("C", 4),
  noteToFrequency("G", 3),
  noteToFrequency("C", 3),
  noteToFrequency("G", 2),
  noteToFrequency("C", 2),
];

export const OPEN_G_TUNING: number[] = [
  noteToFrequency("D", 4),
  noteToFrequency("B", 3),
  noteToFrequency("G", 3),
  noteToFrequency("D", 3),
  noteToFrequency("G", 2),
  noteToFrequency("D", 2),
];

export const TUNINGS: { [name: string]: number[] } = {
  Standard: STANDARD_TUNING,
  Drop_d: DROP_D_TUNING,
  Open_d: OPEN_D_TUNING,
  Open_c: OPEN_C_TUNING,
  Open_g: OPEN_G_TUNING,
};
