import { useContext } from "react";
import { useFretboardSettings } from "../../../../hooks/useFretboardSettings";
import { FretboardContext } from "../../Fretboard/FretboardDashboard";
import { FretboardGrid } from "./styles";

interface FretboardProps {}

export const Fretboard: React.FC<FretboardProps> = () => {
  const { tuning } = useContext(FretboardContext);

  const { status, data: settings } = useFretboardSettings();

  if (status !== "success" || settings == null) {
    return null;
  }

  return (
    <FretboardGrid
      orientation={settings.orientation}
      tuning={tuning}
    />
  );
};
