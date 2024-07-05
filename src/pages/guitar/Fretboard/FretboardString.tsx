import styled from "@emotion/styled";
import React from "react";
import { Fret } from "./Fret/Fret";
import {
  FretboardMode,
  FretboardOrientation,
  FretboardSettings,
} from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";
import { StringNoteSelect } from "./StringNoteSelect";
import { FRET_COUNT, FRET_THICKNESS } from "./consts";

export interface FretboardStringProps {
  settings: FretboardSettings;
  stringNumber: number;
  stringNote: number;
}
const FretboardStringWrapperStyle = styled.div<{
  orientation: FretboardOrientation;
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "Horizontal" ? "row" : "column"};
  position: relative;
  ${({ orientation }) =>
    `${orientation === "Horizontal" ? "width" : "height"}: 100%;`}
`;

const VisibleString = styled.span<{
  orientation: FretboardOrientation;
}>`
  position: absolute;
  z-index: 0;
  background-color: black;
  ${({ orientation }) =>
    orientation === "Horizontal" ? "height: 1px" : "width: 1px"};
  ${({ orientation }) =>
    orientation === "Horizontal" ? "width: 100%" : "height: 100%"};
  align-self: center;
`;

export const GuitarNut = styled.div<{
  mode: FretboardMode;
  orientation: FretboardOrientation;
}>`
  & > * {
    background: transparent;
    border: none;
    cursor: ${({ mode }) => (mode === "Interactive" ? "pointer" : "auto")};
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({ orientation }) =>
      orientation === "Horizontal" ? FRET_THICKNESS : "30"}px;
    width: ${({ orientation }) =>
      orientation === "Vertical" ? FRET_THICKNESS : "30"}px;
  }
`;

export const FretboardString: React.FC<FretboardStringProps> = ({
  stringNumber,
  stringNote,
  settings,
}) => {
  const { setTuning, tuning } = React.useContext(FretboardContext);
  React.useEffect(() => {
    if (settings.selectionMode === "Chord") {
    }
  }, [settings]);
  return (
    <FretboardStringWrapperStyle orientation={settings.orientation}>
      <StringNoteSelect
        settings={settings}
        value={stringNote}
        onChange={(note) => {
          const newTuning = [...tuning];
          newTuning[stringNumber] = note;
          setTuning(newTuning);
        }}
      />
      <FretboardStringWrapperStyle orientation={settings.orientation}>
        <GuitarNut
          orientation={settings.orientation}
          mode={settings.mode}
        >
          <Fret
            settings={settings}
            fretNumber={0}
            stringNote={stringNote}
            stringNumber={stringNumber}
          />
        </GuitarNut>
        {Array(FRET_COUNT)
          .fill(0)
          .map((_, index) => (
            <Fret
              key={`string-${stringNumber}-fret-${index}`}
              settings={settings}
              fretNumber={index + 1}
              stringNote={stringNote}
              stringNumber={stringNumber}
            />
          ))}
        <VisibleString orientation={settings.orientation} />
      </FretboardStringWrapperStyle>
    </FretboardStringWrapperStyle>
  );
};
