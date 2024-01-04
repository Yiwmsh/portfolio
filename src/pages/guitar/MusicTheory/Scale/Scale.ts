import { Interval } from "../Interval";
import { scaleToMode } from "./ScaleUtils";

export type Scale = {
  name: string;
  sequence: Interval[];
};

export const MAJOR_SCALE: Scale = {
  name: "Major",
  sequence: [2, 2, 1, 2, 2, 2, 1],
};

export const NATURAL_MINOR_SCALE: Scale = {
  name: "Minor",
  sequence: scaleToMode(MAJOR_SCALE.sequence, 5),
};

export const CHROMATIC_SCALE: Scale = {
  name: "Chromatic",
  sequence: Array(12).fill(1),
};

// TODO The rest of the scales.

export const HARMONIC_MINOR_SCALE: Scale = {
  name: "Harmonic Minor",
  sequence: [2, 1, 2, 2, 1, 3, 1],
};

export const MELODIC_MINOR_SCALE: Scale = {
  name: "Melodic Minor",
  sequence: [2, 1, 2, 2, 2, 2, 1],
};

// Modes
export const MODES = [
  "Ionian",
  "Dorian",
  "Phrygian",
  "Lydian",
  "Mixolydian",
  "Aeolian",
  "Locrian",
];

export const Scales: { [scaleName: string]: Scale } = {
  Major: MAJOR_SCALE,
  "Natural Minor": NATURAL_MINOR_SCALE,
  Chromatic: CHROMATIC_SCALE,
  "Harmonic Minor": HARMONIC_MINOR_SCALE,
  "Melodic Minor": MELODIC_MINOR_SCALE,
  //Modes
  Ionian: {
    name: "Ionian",
    sequence: MAJOR_SCALE.sequence,
  },
  Dorian: {
    name: "Dorian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 1),
  },
  Phyrgian: {
    name: "Phyrgian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 2),
  },
  Lydian: {
    name: "Lydian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 3),
  },
  Mixolydian: {
    name: "Mixolydian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 4),
  },
  Aeolian: {
    name: "Aeolian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 5),
  },
  Locrian: {
    name: "Locrian",
    sequence: scaleToMode(MAJOR_SCALE.sequence, 6),
  },
};
