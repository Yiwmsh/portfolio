import { useMutation, useQueryClient } from "react-query";
import { FretboardSettings } from "../pages/guitar/Fretboard/Fretboard";
import { FretboardSettingsQueryKey } from "./useFretboardSettings";

export const useEditFretboardSettings = () => {
  const client = useQueryClient();

  return useMutation(
    async (settings: FretboardSettings) => {
      window.localStorage.setItem(
        "fretboardSettings",
        JSON.stringify(settings)
      );
    },
    {
      onSuccess: () => client.invalidateQueries(FretboardSettingsQueryKey),
    }
  );
};
