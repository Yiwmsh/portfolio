import localforage from "localforage";
import React, { ReactNode } from "react";
import { displayMs } from "../../../utils/displayMs";
import { generateGUID } from "../../../utils/generateGuid";
import { useDeck, useUpdateDeck } from "../hooks/decks";
import {
  DeckGoalWithId,
  GOALS_QUERY_KEY,
  useUpdateGoalCache,
} from "../hooks/scryfallQuery";
import { DeckGoal } from "../types";
import { DeckGoalDisplay } from "./DeckGoalDispaly";

interface DeckGoalsListProps {
  selectedDeckGuid: string;
  globalQuery?: string;
}

const deleteGoalCache = async (goalId: string) => {
  const instance = await localforage.createInstance({
    name: GOALS_QUERY_KEY,
    storeName: goalId,
  });
  instance.clear();
};

export const DeckGoalsList: React.FC<DeckGoalsListProps> = ({
  selectedDeckGuid,
  globalQuery,
}) => {
  const { data: selectedDeck, status: selectedDeckStatus } = useDeck(
    selectedDeckGuid ?? ""
  );
  const { mutate: updateDeck } = useUpdateDeck();
  const deleteGoal = (goalId: string) => {
    if (selectedDeck == null) {
      return;
    }
    let updatedDeckGoals: Map<string, DeckGoal> = new Map(
      selectedDeck.goals.entries()
    );
    updatedDeckGoals.delete(goalId);

    deleteGoalCache(goalId);

    updateDeck({ ...selectedDeck, goals: updatedDeckGoals });
  };
  const updateGoal = (goalId: string, goal: DeckGoal) => {
    if (selectedDeck == null) {
      return;
    }
    let updatedDeckGoals: Map<string, DeckGoal> = new Map(
      selectedDeck.goals.entries()
    );
    updatedDeckGoals.set(goalId, goal);

    updateDeck({ ...selectedDeck, goals: updatedDeckGoals });
  };
  const {
    mutate: updateGoalsCache,
    status: goalCacheStatus,
    progress: goalCacheProgress,
    totalCards: goalCacheTotalCards,
    estTimeRemaining,
  } = useUpdateGoalCache();
  const updateSingleGoalCache = (goal: DeckGoalWithId) =>
    updateGoalsCache({
      goals: [goal],
      globalQuery: globalQuery ?? "",
      deckQuery: selectedDeck?.deckQueryFragment ?? "",
    });

  const goalsObjects = React.useMemo(() => {
    if (selectedDeck == null) {
      return [];
    }

    let retVal: ReactNode[] = [];

    selectedDeck.goals.forEach((goal, goalId) => {
      retVal.push(
        <DeckGoalDisplay
          {...goal}
          goalGuid={goalId}
          deckGuid={selectedDeckGuid}
          deleteGoal={deleteGoal}
          updateGoal={updateGoal}
          updateGoalCache={updateSingleGoalCache}
        />
      );
    });

    return retVal;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeck]);

  if (selectedDeckStatus === "loading" || selectedDeck == null) {
    return null;
  }

  if (goalCacheStatus === "loading") {
    return (
      <div>
        <div>
          Updating Goals Cache. Progress: {goalCacheProgress} /{" "}
          {goalCacheTotalCards} cards.
        </div>
        <div>Estimated remaining time: {displayMs(estTimeRemaining)}</div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 20fr 2fr 2fr 2fr",
          width: "100vw",
        }}
      >
        {goalsObjects}
      </div>
      <button
        onClick={() => {
          const guid = generateGUID();
          const newGoal: DeckGoal = {
            name: "",
            queryTerms: "",
            score: 1,
          };

          let updatedDeckGoals: Map<string, DeckGoal> = new Map(
            selectedDeck.goals.entries()
          );

          updatedDeckGoals.set(guid, newGoal);

          updateDeck({ ...selectedDeck, goals: updatedDeckGoals });
        }}
      >
        Add Goal
      </button>
      <button
        onClick={() => {
          let goals: DeckGoalWithId[] = [];
          let updatedGoals: Map<string, DeckGoal> = new Map();
          selectedDeck.goals.forEach((goal, goalId) => {
            goals.push({
              ...goal,
              goalId,
            });
            updatedGoals.set(goalId, { ...goal, dateLastCached: new Date() });
          });
          updateGoalsCache({
            goals: goals,
            globalQuery: globalQuery ?? "",
            deckQuery: selectedDeck.deckQueryFragment,
          });
          updateDeck({ ...selectedDeck, goals: updatedGoals });
        }}
      >
        Update All Caches
      </button>
    </div>
  );
};
