export const pluralize = (
  count: number,
  singular: string,
  plural: string
): string => {
  return `${count} ${count > 1 || count < -1 ? plural : singular}`;
};
