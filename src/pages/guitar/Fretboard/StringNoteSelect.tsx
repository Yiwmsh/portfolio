import styled from "@emotion/styled";
import React from "react";
import { FretboardOrientation, FretboardSettings } from "./Fretboard";
import { noteFrom } from "./MusicTheory/NoteUtilities";
import { MusicalNumber, NOTES, Note } from "./MusicTheory/types";
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
  value: string | number | readonly string[] | undefined;
  onChange: (note: Note) => void;
  options: string[];
}

export const StringNoteSelect: React.FC<StringNoteSelectProps> = ({
  settings,
  value,
  onChange,
  options,
}) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);
  React.useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const currentNoteIndex: MusicalNumber = NOTES.indexOf(
        value as Note
      ) as MusicalNumber;
      const newNote = noteFrom(currentNoteIndex, event.deltaY);
      onChange(NOTES[newNote - 1] as Note);
    };
    selectRef.current?.addEventListener("wheel", handleScroll);

    return () => selectRef.current?.removeEventListener("wheel", handleScroll);
  }, []);
  return (
    <StringNoteSelectStyle
      orientation={settings.orientation}
      value={value}
      onChange={(e) => {
        onChange(e.target.value as Note);
      }}
      ref={selectRef}
    >
      {options.map((option) => (
        <option
          key={option}
          value={`${option}`}
        >
          {option}
        </option>
      ))}
    </StringNoteSelectStyle>
  );
};
