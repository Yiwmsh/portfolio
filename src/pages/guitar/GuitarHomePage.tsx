import { Fretboard } from "./Fretboard/Fretboard";
import { FretboardDashboard } from "./Fretboard/FretboardDashboard";
import { STANDARD_TUNING } from "./Fretboard/MusicTheory/Tunings";

export const GuitarHomePage: React.FC = () => {
  return (
    <FretboardDashboard tuning={STANDARD_TUNING.slice(0, 6)}>
      <Fretboard
        settings={{
          mode: "Interactive",
          orientation: `Horizontal`,
          selectionMode: "Single",
        }}
        tuning={STANDARD_TUNING.slice(0, 6)}
      />
    </FretboardDashboard>
  );
};
