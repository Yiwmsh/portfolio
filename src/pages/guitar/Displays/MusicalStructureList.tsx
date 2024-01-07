import styled from "@emotion/styled";
import React from "react";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "../Fretboard/FretboardDashboard";
import { keyOf, suggestKey } from "../MusicTheory/Key/KeyUtilities";
import { MusicalStructure, Tone } from "../MusicTheory/types";
import { MusicalStructureDisplay } from "./MusicalStructureDisplay";

const MusicalStructureListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

interface MusicalStructureListProps {
  selectedTones: Tone[];
  structures: MusicalStructure[];
}

export const MusicalStructureList: React.FC<MusicalStructureListProps> = ({
  selectedTones,
  structures,
}) => {
  const { data: settings, status } = useFretboardSettings();
  const { clearGhostedFrets, setGhostedFrets, tuning } =
    React.useContext(FretboardContext);
  React.useEffect(() => {
    clearGhostedFrets();

    if (structures.length > 0) {
      if (settings?.selectionMode === "Scale") {
        suggestKey(tuning, structures[0], setGhostedFrets);
      }
    }
  }, [settings?.selectionMode, structures, tuning]);

  if (status !== "success") {
    return null;
  }

  return (
    <MusicalStructureListWrapper>
      {groupMusicalStructuresByIntervals(structures).map((structureGroup) => (
        <MusicalStructureDisplay
          structures={structureGroup}
          presentTones={selectedTones}
        />
      ))}
    </MusicalStructureListWrapper>
  );
};

const groupMusicalStructuresByIntervals = (structures: MusicalStructure[]) => {
  const structureGroups: MusicalStructure[][] = [];
  structures.forEach((structure) => {
    const structureTones = keyOf(structure, structure.root).tones;
    const matchingGroups = structureGroups.filter((structureGroup) => {
      const structureGroupTones = keyOf(
        structureGroup[0],
        structureGroup[0].root
      ).tones;
      return structureGroupTones?.every(
        (groupTone) =>
          structureTones?.some((tone) => tone === groupTone) &&
          structureTones.every((tone) =>
            structureGroupTones.some((groupTone) => tone === groupTone)
          )
      );
    });
    if (matchingGroups.length === 0) {
      structureGroups.push([structure]);
    } else {
      matchingGroups[0].push(structure);
    }
  });

  return structureGroups;
};
