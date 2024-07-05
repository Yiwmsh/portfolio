import { FretboardDashboard } from "./Fretboard/FretboardDashboard";
import { Fretboard } from "./FretboardGrid/Fretboard/Fretboard";

export const GuitarHomePage: React.FC = () => {
  return (
    <FretboardDashboard>
      <Fretboard />
    </FretboardDashboard>
  );
};
