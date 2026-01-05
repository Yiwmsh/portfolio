import {
  msPerDay,
  msPerHour,
  msPerMinute,
  msPerSec,
} from "../pages/scryfall querier/consts";
import { pluralize } from "./pluralize";

export const displayMs = (ms: number): string => {
  if (ms > msPerDay) {
    const days = Math.floor(ms / msPerDay);
    return pluralize(
      days,
      "day",
      "days - please be courteous and tweak your queries to bring this time down."
    );
  } else if (ms > msPerHour) {
    const hours = Math.floor(ms / msPerHour);
    return pluralize(
      hours,
      "hour",
      "hours - please be courteous and tweak your queries to bring this time down."
    );
  } else if (ms > msPerMinute) {
    const minutes = Math.floor(ms / msPerMinute);
    return pluralize(minutes, "minute", "minutes");
  } else {
    const seconds = Math.floor(ms / msPerSec);
    return pluralize(seconds, "second", "seconds");
  }
};
