import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "../Fretboard/FretboardDashboard";
import { suggestKey } from "../MusicTheory/Key/KeyUtilities";
import { toneFrom } from "../MusicTheory/NoteUtilities";
import { MusicalStructure, TONES, Tone } from "../MusicTheory/types";

interface MusicalStructureDisplayProps {
  structure: MusicalStructure;
  presentTones: Tone[];
  confidence: number;
}

const MusicalStructureDisplayWrapper = styled.button`
  border: 1px solid black;
  padding: 5px;
  display: inline-block;
  margin: 5px;
`;

const ToneDisplay = styled.div<{ selected: boolean }>`
  border-radius: 100%;
  border: 1px solid
    ${({ selected }) =>
      selected ? `var(${SemanticColors.secondary})` : "gray"};
  background: ${({ selected }) =>
    selected ? `var(${SemanticColors.secondary})` : "transparent"};
  color: ${({ selected }) =>
    selected
      ? `var(${SemanticColors.altText})`
      : `var(${SemanticColors.text})`};
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  display: inline-block;
  margin: 2px;
`;

export const MusicalStructureDisplay: React.FC<
  MusicalStructureDisplayProps
> = ({ structure, presentTones, confidence }) => {
  const { setGhostedFrets, clearGhostedFrets, tuning, setRoot } =
    React.useContext(FretboardContext);
  const { data: settings, status } = useFretboardSettings();
  const tones = structure.intervals
    .map((interval) => toneFrom(structure.root, interval))
    .sort((a, b) => TONES.indexOf(a) - TONES.indexOf(b));

  if (status !== "success") {
    return <></>;
  }

  return (
    <MusicalStructureDisplayWrapper
      onClick={() => {
        clearGhostedFrets();
        setRoot(structure.root);
        if (settings.selectionMode === "Scale") {
          suggestKey(tuning, structure, setGhostedFrets);
        }
      }}
    >
      {`${structure.root}${structure.shortHand ?? " " + structure.name}`}
      <br />
      Confidence: {Math.round(confidence * 100)}%
      <br />
      {tones.map((tone) => (
        <ToneDisplay selected={presentTones.some((pt) => tone === pt)}>
          {tone}
        </ToneDisplay>
      ))}
    </MusicalStructureDisplayWrapper>
  );
};
