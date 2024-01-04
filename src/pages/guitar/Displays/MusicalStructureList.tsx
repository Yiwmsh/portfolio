import styled from "@emotion/styled";
import React from "react";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "../Fretboard/FretboardDashboard";
import { suggestKey } from "../MusicTheory/Key/KeyUtilities";
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
  structures: (MusicalStructure & {
    confidence: number;
  })[];
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
      {structures.map((structure) => (
        <MusicalStructureDisplay
          structure={structure}
          confidence={structure.confidence}
          presentTones={selectedTones}
        />
      ))}
    </MusicalStructureListWrapper>
  );
};
