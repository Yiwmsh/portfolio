import localforage from "localforage";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const DECK_MODAL_STATUS_KEY = "deck modal status";

export const SITE_SETTINGS_KEYS = [DECK_MODAL_STATUS_KEY] as const;

export type SiteSettingKey = (typeof SITE_SETTINGS_KEYS)[number];

export const useSiteSetting = (setting: SiteSettingKey) => {
  const client = useQueryClient();
  const { data: settingValue } = useQuery([setting], async () => {
    const fetchedStatus = await localforage.getItem(setting);
    return fetchedStatus === true;
  });
  const { mutate: setSetting } = useMutation({
    mutationFn: async (newValue: boolean) =>
      localforage.setItem(setting, newValue),
    onSettled: () => client.invalidateQueries(setting),
  });

  const toggleSetting = () => setSetting(!(settingValue === true));

  return { settingValue, toggleSetting, setSetting };
};
