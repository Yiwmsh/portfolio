import { Fretboard } from "./Fretboard/Fretboard";
import { STANDARD_TUNING } from "./Fretboard/MusicTheory/Tunings";

export const GuitarHomePage: React.FC = () => {
  const blah = "";

  return (
    <Fretboard
      mode={"Interactive"}
      orientation={`Horizontal`}
      tuning={STANDARD_TUNING.slice(0, 6)}
    />
  );
};
