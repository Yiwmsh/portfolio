import { mod } from "../../../../utils/mod";
import { Interval } from "../Interval";
import { toneFrom } from "../NoteUtilities";
import { MusicalNumber, TONES, Tone } from "../types";

export const scaleToMode = (sequence: Interval[], mode: number): Interval[] => {
  const scalePosition = mode % (sequence.length + 1);

  return [
    ...sequence.slice(scalePosition),
    ...sequence.slice(0, scalePosition),
  ];
};

export const scaleInKey = (scale: Interval[], key: Tone): Tone[] => {
  const keyTones: Set<Tone> = new Set<Tone>([key]);
  let lastTone: Tone = key;
  for (const interval of scale) {
    const tone =
      TONES[toneFrom(TONES.indexOf(lastTone) as MusicalNumber, interval) % 12];
    keyTones.add(tone);
    lastTone = tone;
  }

  return Array.from(keyTones.values());
};

export const keyToScale = (keyIntervals: Interval[]): Interval[] => {
  const intervals: Interval[] = [];

  keyIntervals.forEach((interval, index) => {
    intervals.push(
      mod(keyIntervals[(index + 1) % keyIntervals.length] - interval, 12)
    );
  });

  return intervals;
};
