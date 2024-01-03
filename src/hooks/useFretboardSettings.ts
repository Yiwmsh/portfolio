import { useQuery } from "react-query";
import {
  DEFAULT_FRETBOARD_SETTINGS,
  FretboardSettings,
} from "../pages/guitar/Fretboard/Fretboard";

export const FretboardSettingsQueryKey = ["fretboardSettings"];

export const useFretboardSettings = () =>
  useQuery(FretboardSettingsQueryKey, async () => {
    const settings = window.localStorage.getItem("fretboardSettings");
    if (settings) {
      return JSON.parse(settings) as FretboardSettings;
    } else {
      return DEFAULT_FRETBOARD_SETTINGS;
    }
  });
