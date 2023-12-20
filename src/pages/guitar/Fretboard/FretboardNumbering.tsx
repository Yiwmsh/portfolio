import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { FretButton } from "./Fret";
import { FretboardOrientation, FretboardSettings } from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";
import { GuitarNut } from "./FretboardString";
import { TUNINGS } from "./MusicTheory/Tunings";
import { StringNoteSelectStyle } from "./StringNoteSelect";
import { FRET_COUNT } from "./consts";

const FretboardNumberingContainer = styled.div<{
  orientation: FretboardOrientation;
}>`
  box-sizing: border-box;
  ${({ orientation }) =>
    `${orientation === "Horizontal" ? "width" : "height"}: 100%;`}
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "row" : "column"};
`;

const FretboardNumber = styled(FretButton)`
  background-color: transparent;
  border-color: transparent;
`;

const NumberContainer = styled.div<{
  orientation: FretboardOrientation;
}>`
  box-sizing: border-box;
  ${({ orientation }) =>
    `${orientation === "Horizontal" ? "width" : "height"}: 100%;`}
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "row" : "column"};
`;

const TuningSelect = styled(StringNoteSelectStyle)`
  background-color: transparent;
  border-color: transparent;
  color: var(${SemanticColors.text});
  line-height: 100%;
  font-weight: bold;
  font-size: 1.1rem;

  & > option {
    font-weight: normal;
    font-size: 0.9rem;
  }

  option:first-of-type {
    display: none;
  }
`;

interface FretboardNumberProps {
  orientation: FretboardOrientation;
  settings: FretboardSettings;
}

export const FretboardNumbering: React.FC<FretboardNumberProps> = ({
  orientation,
  settings,
}) => {
  const { selectedFrets, setSelectedFrets, setTuning, tuning } =
    React.useContext(FretboardContext);
  return (
    <FretboardNumberingContainer orientation={orientation}>
      <TuningSelect
        onChange={(e) => {
          const selectedTuning = e.target.value;
          setTuning(TUNINGS[selectedTuning].slice(0, settings.stringCount));
        }}
        orientation={settings.orientation}
        value={"⑂"}
      >
        {["⑂", ...Object.keys(TUNINGS)].map((option) => (
          <option key={option}>{option.replaceAll("_", " ")}</option>
        ))}
      </TuningSelect>
      <NumberContainer orientation={settings.orientation}>
        <GuitarNut
          orientation={settings.orientation}
          mode={"Inert"}
        />
        {Array(FRET_COUNT)
          .fill(0)
          .map((_, index) => (
            <FretboardNumber
              orientation={orientation}
              fretNumber={index + 1}
              key={`fretNumbering-${index}`}
              mode="Inert"
            >
              {index}
            </FretboardNumber>
          ))}
      </NumberContainer>
    </FretboardNumberingContainer>
  );
};
