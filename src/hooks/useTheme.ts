import { Theme } from "@chrisellis/react-carpentry";
import { useQuery } from "react-query";
import { LightTheme } from "../consts/theme";

export const ThemeQueryKey = ["activeTheme"];

export const useTheme = () =>
  useQuery(ThemeQueryKey, async () => {
    const theme = window.localStorage.getItem("activeTheme");
    if (theme) {
      return JSON.parse(theme) as Theme;
    } else {
      return LightTheme;
    }
  });
