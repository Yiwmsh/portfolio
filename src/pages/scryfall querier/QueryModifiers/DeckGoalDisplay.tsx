import localforage from "localforage";
import React from "react";
import { pluralize } from "../../../utils/pluralize";
import { LowFrictionInput } from "../Components/LowFrictionInput";
import { msPerDay, msPerHour, msPerMinute } from "../consts";
import {
  DeckGoalWithId,
  GOAL_ERROR_CODE_KEY,
  GOAL_ERROR_MESSAGE_KEY,
  GOALS_QUERY_KEY,
  ScryfallError,
} from "../hooks/scryfallQuery";
import { DeckGoal } from "../types";
import { displayScryfallError } from "../utilities/displayScryfallError";

const displayLastCached = (ms: number): { message: string; color: string } => {
  if (ms > msPerDay) {
    const days = Math.floor(ms / msPerDay);
    return {
      color: days > 90 ? "red" : days > 30 ? "orange" : "green",
      message: pluralize(days, "day", "days"),
    };
  } else if (ms > msPerHour) {
    const hours = Math.floor(ms / msPerHour);
    return {
      color: "green",
      message: pluralize(hours, "hour", "hours"),
    };
  } else if (ms > msPerMinute) {
    const minutes = Math.floor(ms / msPerMinute);
    return {
      color: "green",
      message: pluralize(minutes, "minute", "minutes"),
    };
  } else {
    return {
      color: "green",
      message: "Just now",
    };
  }
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
              maxHeight: "1.5rem",
              alignSelf: "center",
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
        onUpdate={async (newValue) => {
          if (newValue !== queryTerms) {
            const goalTable = localforage.createInstance({
              name: GOALS_QUERY_KEY,
              storeName: goalGuid,
            });
            await goalTable.clear();
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
            <GoalCacheStatusDisplay
              goalId={goalGuid}
              dateLastCached={dateLastCached}
            />
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

interface GoalCacheStatusDisplayProps {
  goalId: string;
  dateLastCached?: Date;
}

export const GoalCacheStatusDisplay: React.FC<GoalCacheStatusDisplayProps> = ({
  goalId,
  dateLastCached,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [cacheSize, setCacheSize] = React.useState(0);
  const [cacheError, setCacheError] = React.useState<ScryfallError | null>(
    null
  );

  const checkCache = async () => {
    setLoading(true);
    const instance = await localforage.createInstance({
      name: GOALS_QUERY_KEY,
      storeName: goalId,
    });

    const len = await instance.length();
    setCacheSize(len);

    const errorCode: number | null = await instance.getItem(
      GOAL_ERROR_CODE_KEY
    );
    const errorMessage: string | null = await instance.getItem(
      GOAL_ERROR_MESSAGE_KEY
    );

    if (errorCode != null || errorMessage != null) {
      setCacheError({
        code: errorCode ?? undefined,
        message: errorMessage ?? undefined,
      });
    }

    setLoading(false);
  };

  React.useEffect(() => {
    checkCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return "...";
  }

  let message = "";
  let color = "";

  /* Possible Cases:
  Query Error - error | date | Cache Size: 0
  Query Error - error | date | Cache Size: >0
  Query Error - error | no date | Cache Size: 0
  Query Error - error | no date | Cache Size: >0
  Can't happen? - no error | date | Cache Size: 0
  Valid Results, Date Known - no error | date | Cache Size: >0
  Probably Never Searched - no error | no date | Cache Size: 0
  Query updated since last cache - no error | no date | Cache Size: >0
  */

  if (cacheError != null) {
    color = "red";
    // TODO Make more useful error messages.
    message = displayScryfallError(cacheError);
  } else if (dateLastCached == null || cacheSize === 0) {
    /* Remaining cases:
  Can't happen? - no error | date | Cache Size: 0
  Valid Results, Date Known - no error | date | Cache Size: >0
  Probably Never Searched - no error | no date | Cache Size: 0
  Query updated since last cache - no error | no date | Cache Size: >0
   */

    message = "Not cached";
    color = "orange";
  } else {
    /* Remaining cases:
  Valid Results, Date Known - no error | date | Cache Size: >0
   */
    const { message: dateMessage, color: dateColor } = displayLastCached(
      Date.now() - dateLastCached.getTime()
    );
    message = `${cacheSize} cards cached ${dateMessage.toLowerCase()}${
      dateMessage.toLowerCase() === "just now" ? "" : " ago"
    }`;
    color = dateColor;
  }

  return (
    <span
      style={{
        color: color,
        fontSize: "0.85em",
      }}
    >
      {message}
    </span>
  );
};
