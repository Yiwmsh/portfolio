import styled from "@emotion/styled";
import React from "react";
import { FREQUENCIES } from "../MusicTheory/Frequency";
import { FretboardOrientation, FretboardSettings } from "./Fretboard";
import { FRET_THICKNESS } from "./consts";

export const StringNoteSelectStyle = styled.select<{
  orientation: FretboardOrientation;
}>`
  height: ${({ orientation }) =>
    orientation === "Horizontal" ? `${FRET_THICKNESS - 4}px` : `30px`};
  width: ${({ orientation }) =>
    orientation === "Vertical" ? `${FRET_THICKNESS - 4}px` : `30px`};
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  margin: ${({ orientation }) =>
    orientation === "Horizontal" ? `2px 5px` : `5px 2px`};
  cursor: pointer;

  .select-selected:after {
    display: none;
  }
`;

interface StringNoteSelectProps {
  settings: FretboardSettings;
  value: number;
  onChange: (note: number) => void;
}

export const StringNoteSelect: React.FC<StringNoteSelectProps> = ({
  settings,
  value,
  onChange,
}) => {
  return (
    <StringNoteSelectStyle
      orientation={settings.orientation}
      value={value}
      onChange={(e) => {
        console.log(e.target.value);
        onChange(Number(e.target.value));
      }}
    >
      {FREQUENCIES.map((note) => (
        <option
          key={note.frequency}
          value={note.frequency}
        >
          {`${note.tone}${note.octave}`}
        </option>
      ))}
    </StringNoteSelectStyle>
  );
};
