/* Did you know that in Javascript, `%` is not actually a 'modulo' operator, despite being commonly referred to as such? 
Rather, it is a 'remainder' operator. This means it handles negative numbers differently than the modulo function.
That was fun to debug.
*/
export const mod = (a: number, b: number): number => {
  const remainder = a % b;
  return Math.floor(remainder >= 0 ? remainder : remainder + b);
};
