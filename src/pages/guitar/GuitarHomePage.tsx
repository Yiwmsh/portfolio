import { Fretboard } from "./Fretboard/Fretboard";
import { FretboardDashboard } from "./Fretboard/FretboardDashboard";

export const GuitarHomePage: React.FC = () => {
  return (
    <FretboardDashboard>
      <Fretboard />
    </FretboardDashboard>
  );
};
