import { MusicalNumber } from "./types";

export type Scale = {
  name: string;
  symbol?: string;
  sequence: MusicalNumber[];
};

export const MAJOR_SCALE: Scale = {
  name: "Major",
  symbol: "",
  sequence: [2, 2, 1, 2, 2, 2, 1],
};

export const NATURAL_MINOR_SCALE: Scale = {
  name: "Minor",
  symbol: "m",
  sequence: [2, 1, 2, 2, 1, 3, 1],
};

export const CHROMATIC_SCALE: Scale = {
  name: "Chromatic",
  symbol: "",
  sequence: Array(12).fill(1),
};
