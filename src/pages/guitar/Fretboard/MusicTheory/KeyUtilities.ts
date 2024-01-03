import { mod } from "../../../../utils/mod";
import { Interval } from "./Interval";
import { AbstractMusicalKey, MusicalKey } from "./Key";
import { keyToScale, scaleInKey, scaleToMode } from "./ScaleUtils";
import { Tone } from "./types";

export const scaleToKey = (scaleIntervals: Interval[]): Interval[] => {
  const keyIntervals: Interval[] = [0];

  scaleIntervals.forEach((scaleInterval, index) => {
    const interval = mod(keyIntervals[index] + scaleInterval, 12);
    if (!keyIntervals.some((keyInterval) => keyInterval === interval)) {
      keyIntervals.push(interval);
    }
  });

  return keyIntervals;
};

export const keyToMode = (
  key: AbstractMusicalKey,
  mode: number
): AbstractMusicalKey => {
  const sequence = keyToScale(key.intervals);
  const modeSequence = scaleToMode(sequence, mode);
  return {
    ...key,
    intervals: scaleToKey(modeSequence),
  };
};

export const keyOf = (key: AbstractMusicalKey, root: Tone): MusicalKey => {
  return { ...key, root, tones: scaleInKey(keyToScale(key.intervals), root) };
};
