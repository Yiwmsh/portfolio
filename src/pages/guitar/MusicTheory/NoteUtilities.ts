import { MusicalNumber, Note, TONES, Tone } from "./types";

export function toneFrom(
  startingTone: MusicalNumber,
  interval: number
): MusicalNumber;

export function toneFrom(startingTone: Tone, interval: number): Tone;

export function toneFrom(startingTone: any, interval: number): any {
  if (typeof startingTone === "number") {
    return ((startingTone + interval) % 12) as MusicalNumber;
  } else if (typeof startingTone === "string") {
    return TONES[(TONES.indexOf(startingTone as Tone) + interval) % 12];
  }
}

export const intervalBetween = (
  startingTone: Tone,
  targetTone: Tone
): MusicalNumber => {
  let semitones = 0;
  let cursor = TONES.indexOf(startingTone);
  while (TONES[cursor] !== targetTone) {
    cursor++;
    if (cursor > TONES.length - 1) {
      cursor = 0;
    }
    semitones++;
  }
  return (semitones % 12) as MusicalNumber;
};

export const fullIntervalBetween = (startingNote: Note, targetNote: Note) => {
  const semitoneDistance =
    intervalBetween(startingNote.tone, targetNote.tone) +
    (targetNote.octave - startingNote.octave) * 12;
  return semitoneDistance;
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
