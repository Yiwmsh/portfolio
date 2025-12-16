import localforage from "localforage";
import React from "react";
import { DeckGoalWithId, GOALS_QUERY_KEY } from "../hooks/scryfallQuery";
import { LowFrictionInput } from "../LowFrictionInput";
import { DeckGoal } from "../types";

const msPerSec = 1000;
const msPerMinute = 60 * msPerSec;
const msPerHour = 60 * msPerMinute;
const msPerDay = 24 * msPerHour;

const displayLastCached = (ms: number) => {
  if (ms > msPerDay) {
    return `${Math.floor(ms / msPerDay)} days`;
  } else if (ms > msPerHour) {
    return `${Math.floor(ms / msPerHour)} hours`;
  } else if (ms > msPerMinute) {
    return `${Math.floor(ms / msPerMinute)} minutes`;
  } else {
    return "Just now";
  }
};

const useIsCacheValid = (goalId: string) => {
  const [validCache, setValidCache] = React.useState(false);

  const checkCache = async () => {
    const instance = await localforage.createInstance({
      name: GOALS_QUERY_KEY,
      storeName: goalId,
    });

    const len = await instance.length();

    if (len > 0) {
      setValidCache(true);
    } else {
      await instance.clear();
      setValidCache(false);
    }
  };

  checkCache();
  return validCache;
};

type DeckGoalProps = DeckGoal & {
  deckGuid: string;
  goalGuid: string;
  deleteGoal: (goalId: string) => void;
  updateGoal: (goalId: string, updatedGoal: DeckGoal) => void;
  updateGoalCache: (goal: DeckGoalWithId) => void;
};

export const DeckGoalDisplay: React.FC<DeckGoalProps> = ({
  deckGuid,
  goalGuid,
  name,
  queryTerms,
  score,
  dateLastCached,
  deleteGoal,
  updateGoal,
  updateGoalCache,
}) => {
  const cacheIsValid = useIsCacheValid(goalGuid);

  return (
    <div
      key={goalGuid}
      style={{
        display: "contents",
      }}
    >
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
          updateGoal(goalGuid, { score, queryTerms, name: newValue })
        }
      />
      <LowFrictionInput
        style={{
          gridColumn: "3",
        }}
        value={queryTerms}
        onUpdate={(newValue) =>
          updateGoal(goalGuid, { name, score, queryTerms: newValue })
        }
      />
      <LowFrictionInput
        style={{
          gridColumn: "4",
        }}
        value={`${score}`}
        onUpdate={(newValue) =>
          updateGoal(goalGuid, { name, score: Number(newValue), queryTerms })
        }
      />
      <label
        style={{
          gridColumn: "5",
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
    </div>
  );
};
