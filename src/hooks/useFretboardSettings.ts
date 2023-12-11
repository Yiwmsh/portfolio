import { useQuery } from "react-query";
import { FretboardSettings } from "../pages/guitar/Fretboard/Fretboard";

export const FretboardSettingsQueryKey = ["fretboardSettings"];

export const useFretboardSettings = () =>
  useQuery(FretboardSettingsQueryKey, async () => {
    const settings = window.localStorage.getItem("fretboardSettings");
    if (settings) {
      return JSON.parse(settings) as FretboardSettings;
    }
  });
