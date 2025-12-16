import localforage from "localforage";
import { useMutation, useQuery, useQueryClient } from "react-query";

const GLOBAL_SCRYFALL_QUERY_TERMS_KEY = "global scryfall query terms";

export const useGlobalScryfallQueryTerms = () =>
  useQuery(GLOBAL_SCRYFALL_QUERY_TERMS_KEY, async () => {
    return (await localforage.getItem(
      GLOBAL_SCRYFALL_QUERY_TERMS_KEY
    )) as string;
  });

export function useUpdateGlobalScryfallQueryTerms() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (newQueryTerms: string) =>
      localforage.setItem(GLOBAL_SCRYFALL_QUERY_TERMS_KEY, newQueryTerms),
    onSettled: () => {
      client.invalidateQueries(GLOBAL_SCRYFALL_QUERY_TERMS_KEY);
    },
  });
}
