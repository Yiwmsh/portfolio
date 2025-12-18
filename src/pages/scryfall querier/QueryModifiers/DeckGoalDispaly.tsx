import localforage from "localforage";
import React from "react";
import { pluralize } from "../../../utils/pluralize";
import { LowFrictionInput } from "../Components/LowFrictionInput";
import { msPerDay, msPerHour, msPerMinute } from "../consts";
import { DeckGoalWithId, GOALS_QUERY_KEY } from "../hooks/scryfallQuery";
import { DeckGoal } from "../types";

const displayLastCached = (ms: number) => {
  if (ms > msPerDay) {
    const days = Math.floor(ms / msPerDay);
    return pluralize(days, "day", "days");
  } else if (ms > msPerHour) {
    const hours = Math.floor(ms / msPerHour);
    return pluralize(hours, "hour", "hours");
  } else if (ms > msPerMinute) {
    const minutes = Math.floor(ms / msPerMinute);
    return pluralize(minutes, "minute", "minutes");
  } else {
    return "Just now";
  }
};

const useCacheStats = (goalId: string, dateLastCached?: Date) => {
  const [validCache, setValidCache] = React.useState(false);
  const [cacheSize, setCacheSize] = React.useState(0);

  const checkCache = async () => {
    const instance = await localforage.createInstance({
      name: GOALS_QUERY_KEY,
      storeName: goalId,
    });

    const len = await instance.length();
    setCacheSize(len);

    if (len > 0) {
      setValidCache(true);
    } else {
      await instance.clear();
      setValidCache(false);
    }
  };

  checkCache();
  return { validCache, cacheSize };
};

type DeckGoalProps = DeckGoal & {
  goalGuid: string;
  deleteGoal: (goalId: string) => void;
  updateGoal: (goalId: string, updatedGoal: DeckGoal) => void;
  updateGoalCache: (goal: DeckGoalWithId) => void;
};

export const DeckGoalDisplay: React.FC<DeckGoalProps> = ({
  goalGuid,
  name,
  queryTerms,
  score,
  dateLastCached,
  deleteGoal,
  updateGoal,
  updateGoalCache,
}) => {
  const { validCache: cacheIsValid, cacheSize } = useCacheStats(goalGuid);
  const [goalQueryTermsFocused, setGoalQueryTermsFocused] =
    React.useState(false);

  return (
    <div
      key={goalGuid}
      style={{
        display: "contents",
      }}
    >
      {!goalQueryTermsFocused && (
        <>
          <button
            style={{
              gridColumn: "1",
            }}
            onClick={() => deleteGoal(goalGuid)}
          >
            x
          </button>
          <LowFrictionInput
            style={{
              gridColumn: "2",
            }}
            value={name}
            onUpdate={(newValue) =>
              updateGoal(goalGuid, {
                score,
                queryTerms,
                name: newValue,
                dateLastCached,
              })
            }
          />
        </>
      )}
      <LowFrictionInput
        style={{
          gridColumn: goalQueryTermsFocused ? "span 6" : "3",
        }}
        value={queryTerms}
        onFocusChange={(isFocused) => setGoalQueryTermsFocused(isFocused)}
        onUpdate={(newValue) => {
          if (newValue !== queryTerms) {
            updateGoal(goalGuid, { name, score, queryTerms: newValue });
          }
        }}
      />
      {!goalQueryTermsFocused && (
        <>
          <LowFrictionInput
            style={{
              gridColumn: "4",
            }}
            value={`${score}`}
            onUpdate={(newValue) =>
              updateGoal(goalGuid, {
                name,
                score: Number(newValue),
                queryTerms,
                dateLastCached,
              })
            }
          />
          <label
            style={{
              gridColumn: "5",
              textAlign: "center",
            }}
          >
            {dateLastCached?.toString() && cacheIsValid
              ? displayLastCached(Date.now() - dateLastCached.getTime())
              : "Not cached"}
          </label>
          <button
            style={{
              gridColumn: "6",
            }}
            onClick={() => {
              updateGoalCache({
                name,
                queryTerms,
                score,
                goalId: goalGuid,
              });
              updateGoal(goalGuid, {
                name,
                queryTerms,
                score,
                dateLastCached: new Date(),
              });
            }}
          >
            Update Cache
          </button>
        </>
      )}
    </div>
  );
};
