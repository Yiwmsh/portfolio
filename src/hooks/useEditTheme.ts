import { Theme } from "@chrisellis/react-carpentry";
import { useMutation, useQueryClient } from "react-query";
import { ThemeQueryKey } from "./useTheme";

export const useEditTheme = () => {
  const client = useQueryClient();

  return useMutation(
    async (theme: Theme) => {
      window.localStorage.setItem("activeTheme", JSON.stringify(theme));
    },
    {
      onSuccess: () => client.invalidateQueries(ThemeQueryKey),
    }
  );
};
