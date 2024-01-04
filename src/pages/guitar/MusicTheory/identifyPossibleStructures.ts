import { intervalBetween } from "./NoteUtilities";
import {
  AbstractMusicalStructure,
  MusicalNumber,
  Note,
  TONES,
  Tone,
} from "./types";

export const identifyPossibleStructures = <T extends AbstractMusicalStructure>(
  notes: Note[],
  comparisonPool: { [key: string]: T }
) => {
  const possibleStructures: Set<T & { root: Tone; confidence: number }> =
    new Set<T & { root: Tone; confidence: number }>();
  // Make a set of discrete tones
  const toneSet = new Set<Tone>(notes.map((note) => note.tone));

  // Save some computation. Return empty if it can't be at least a 50% match for anything in the pool.
  const shortestStructure = getShortestStructure(comparisonPool);
  if (toneSet.size < shortestStructure / 2) {
    return [];
  }

  // Iterate through the tones in the structure, treating each as though it were the root.
  TONES.forEach((rootTone) => {
    // Get each interval
    const intervals: MusicalNumber[] = [];
    toneSet.forEach((tone) => {
      intervals.push(intervalBetween(rootTone, tone));
    });
    const possibleStructuresWithRootN = identifyPossibleStructuresFromIntervals(
      intervals,
      comparisonPool
    );
    possibleStructuresWithRootN.forEach((structure) => {
      possibleStructures.add({ ...structure, root: rootTone });
    });
  });

  return Array.from(possibleStructures.values()).sort(
    (a, b) => b.confidence - a.confidence
  );
};
const identifyPossibleStructuresFromIntervals = <
  T extends AbstractMusicalStructure
>(
  intervals: MusicalNumber[],
  comparisonPool: { [key: string]: T }
): (T & { confidence: number })[] => {
  const possibleStructures: (T & { confidence: number })[] = [];
  // Get perfect matches
  Object.keys(comparisonPool).forEach((structureKey) => {
    const structure = comparisonPool[structureKey];
    if (intervals.length > structure.intervals.length / 2) {
      let matchingIntervals = 0;
      structure.intervals.forEach((structureInterval) => {
        if (intervals.some((interval) => structureInterval === interval)) {
          matchingIntervals++;
        }
      });
      const confidence = matchingIntervals / structure.intervals.length;
      if (
        confidence > 0.5 &&
        intervals.every((interval) =>
          structure.intervals.some(
            (structureInterval) => interval === structureInterval
          )
        )
      ) {
        possibleStructures.push({
          ...comparisonPool[structureKey],
          confidence,
        });
      }
    }
  });
  return possibleStructures;
};

const getShortestStructure = <
  T extends AbstractMusicalStructure
>(comparisonPool: {
  [key: string]: T;
}) => {
  const structure = Object.values(comparisonPool);
  let shortestStructure = structure[0].intervals.length;
  structure.forEach((structure) => {
    if (structure.intervals.length < shortestStructure) {
      shortestStructure = structure.intervals.length;
    }
  });

  return shortestStructure;
};
