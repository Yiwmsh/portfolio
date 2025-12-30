import { ScryfallError } from "../hooks/scryfallQuery";

export const displayScryfallError = (e: ScryfallError) => {
  switch (e.code) {
    case 404:
      return "No results";
    default:
      return e.message ?? `Unknown Error with code: ${e.code}`;
  }
};
