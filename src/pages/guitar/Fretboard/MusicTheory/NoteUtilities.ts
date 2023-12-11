import { CHROMATIC_SCALE } from "./Scale";
import { MusicalKey, MusicalNumber, NOTES } from "./types";

export const noteAt = (
  index: number,
  key: MusicalKey = { root: 3, scale: CHROMATIC_SCALE }
) => {
  let cursor: number = key.root;

  for (let i = 0; i < index; i++) {
    cursor = cursor + key.scale.sequence[i % key.scale.sequence.length];
  }
  return NOTES[cursor % NOTES.length];
};

export const noteFrom = (
  startingNote: MusicalNumber,
  interval: number
): MusicalNumber => {
  return ((startingNote + interval) % 12) as MusicalNumber;
};
