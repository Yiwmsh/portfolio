export const clamp = (n: number, min: number, max: number): number => {
  if (n < min) {
    return min;
  } else if (n > max) {
    return max;
  } else {
    return n;
  }
};
