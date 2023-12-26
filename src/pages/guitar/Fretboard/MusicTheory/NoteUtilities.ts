import { CHROMATIC_SCALE } from "./Scale";
import {
  MusicalKey,
  MusicalNumber,
  Note,
  Tone,
  ToneLetter,
  TONES,
} from "./types";

export const deriveToneFromFrequency = (frequency: number): ToneLetter => {
  // TODO
  throw new Error("Not implemented");
};

export const noteAt = (
  index: number,
  key: MusicalKey = { root: 3, scale: CHROMATIC_SCALE }
) => {
  let cursor: number = key.root;

  for (let i = 0; i < index; i++) {
    cursor = cursor + key.scale.sequence[i % key.scale.sequence.length];
  }
  return TONES[cursor % TONES.length];
};

export const noteFrom = (
  startingNote: MusicalNumber,
  interval: number
): MusicalNumber => {
  return ((startingNote + interval) % 12) as MusicalNumber;
};

export const intervalBetween = (
  startingNote: Tone,
  targetNote: Tone
): MusicalNumber => {
  const semitones = Math.abs(
    (TONES.indexOf(startingNote) - TONES.indexOf(targetNote)) % 12
  ) as MusicalNumber;
  return semitones;
};

const a = Math.pow(2, 1 / 12);

// A4 = 440
export const ROOT_FREQUENCY = 440;

export const noteToFrequency = (tone: Tone, octave: number): number => {
  // Derive semitone distance.
  const semitoneDistance =
    (octave - 4) * 12 - (TONES.indexOf("A") - TONES.indexOf(tone));

  // Calculate frequency
  return ROOT_FREQUENCY * Math.pow(a, semitoneDistance);
};

export const frequencyToNote = (frequency: number): Note => {
  const semitoneNumber =
    Math.round(12 * Math.log2(frequency / ROOT_FREQUENCY)) + 57;
  const octave = Math.trunc(semitoneNumber / 12);
  const tone = TONES[semitoneNumber % 12];
  return { tone, octave };
};

export const addSemitonesToFrequency = (
  frequency: number,
  semitones: number
) => {
  const semitoneNumber =
    Math.round(12 * Math.log2(frequency / ROOT_FREQUENCY)) + 57 + semitones;
  const octave = Math.trunc(semitoneNumber / 12);
  const tone = TONES[semitoneNumber % 12];
  return noteToFrequency(tone, octave);
};
