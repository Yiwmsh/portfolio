import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "../Fretboard/FretboardDashboard";
import {
  FRET_ACTIVE_BACKGROUND_COLOR,
  FRET_ACTIVE_BORDER_COLOR,
  FRET_ROOT_BACKGROUND_COLOR,
} from "../Fretboard/consts";
import { keyOf, suggestKey } from "../MusicTheory/Key/KeyUtilities";
import { toneFrom } from "../MusicTheory/NoteUtilities";
import { MusicalStructure, TONES, Tone } from "../MusicTheory/types";

interface MusicalStructureDisplayProps {
  structures: MusicalStructure[];
  presentTones: Tone[];
}

const MusicalStructureDisplayWrapper = styled.button`
  border: 1px solid black;
  padding: 5px;
  display: inline-block;
  margin: 5px;
`;

const ToneDisplay = styled.button<{ selected: boolean; root: boolean }>`
  border-radius: 100%;
  padding: 0;
  border: ${({ selected, root }) =>
    selected
      ? "none"
      : `1px solid ${root ? FRET_ROOT_BACKGROUND_COLOR : "gray"}`};
  background: ${({ selected, root }) =>
    root && selected
      ? FRET_ROOT_BACKGROUND_COLOR
      : selected
      ? FRET_ACTIVE_BACKGROUND_COLOR
      : "transparent"};
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

  &:hover {
    background-color: ${FRET_ACTIVE_BORDER_COLOR};
    color: var(${SemanticColors.text});
  }
`;

export const MusicalStructureDisplay: React.FC<
  MusicalStructureDisplayProps
> = ({ structures, presentTones }) => {
  const { setGhostedFrets, clearGhostedFrets, tuning, setRoot, root } =
    React.useContext(FretboardContext);
  const { data: settings, status } = useFretboardSettings();

  const tones = structures[0].intervals
    .map((interval) => toneFrom(structures[0].root, interval))
    .sort((a, b) => TONES.indexOf(a) - TONES.indexOf(b));
  const availableRoots = structures.map((struct) => struct.root);

  const structuresWithMatchingRoots: MusicalStructure[] = React.useMemo(() => {
    return structures.filter((structure) => structure.root === root);
  }, [root, structures]);
  const selectedStructure = React.useMemo(() => {
    return structuresWithMatchingRoots.length > 0
      ? structuresWithMatchingRoots[0]
      : structures[0];
  }, [structures, structuresWithMatchingRoots]);

  if (
    status !== "success" ||
    (root != null &&
      !keyOf(structures[0], structures[0].root).tones?.some(
        (tone) => tone === root
      ))
  ) {
    return <></>;
  }

  return (
    <MusicalStructureDisplayWrapper
      onClick={() => {
        clearGhostedFrets();
        setRoot(selectedStructure.root);
        if (settings.selectionMode === "Scale") {
          suggestKey(tuning, selectedStructure, setGhostedFrets);
        }
      }}
    >
      {`${selectedStructure.root}${
        structuresWithMatchingRoots.length > 0
          ? structuresWithMatchingRoots
              .map((struct) => `${struct.shortHand ?? " " + struct.name}`)
              .join(" / ")
          : selectedStructure.shortHand ?? selectedStructure.name
      }`}
      <br />
      {tones.map((tone) => (
        <ToneDisplay
          selected={presentTones.some((pt) => tone === pt)}
          root={
            tones.some((someTone) => someTone === root)
              ? tone === root
              : selectedStructure.root === tone
          }
          disabled={
            !availableRoots.some((availableRoot) => availableRoot === root)
          }
          onClick={(e) => {
            e.stopPropagation();
            setRoot(tone);
          }}
        >
          {tone}
        </ToneDisplay>
      ))}
    </MusicalStructureDisplayWrapper>
  );
};
