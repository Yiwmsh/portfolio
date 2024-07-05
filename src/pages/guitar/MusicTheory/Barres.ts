export type Barre = {
  fret: number;
  startingString: number;
  endingString: number;
};

export const findBarreOnFret = (
  selectedFrets: boolean[][],
  fret: number
): Barre | false => {
  let startingString: number | null = null;
  let endingString: number | null = null;
  selectedFrets.forEach((guitarString, stringIndex) => {
    if (guitarString[fret]) {
      if (startingString === null) {
        startingString = stringIndex;
      } else {
        if (
          (endingString === null && startingString === stringIndex - 1) ||
          endingString === stringIndex - 1
        ) {
          endingString = stringIndex;
        } else {
          return false;
        }
      }
    }
  });

  return startingString !== null && endingString !== null
    ? { startingString, endingString, fret }
    : false;
};
