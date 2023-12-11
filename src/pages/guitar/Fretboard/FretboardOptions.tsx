import styled from "@emotion/styled";
import { SwitchControl } from "../../../components/SwitchControl";
import { useEditFretboardSettings } from "../../../hooks/useEditFretboardSettings";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";

const FretboardOptionsContainer = styled.div``;

interface FretboardOptionsProps {}

export const FretboardOptions: React.FC<FretboardOptionsProps> = ({}) => {
  const { data: settings, status } = useFretboardSettings();
  const { mutate: updateSettings } = useEditFretboardSettings();

  if (settings == null) {
    updateSettings({
      mode: "Interactive",
      selectionMode: "Multiple",
      orientation: "Horizontal",
    });
  }

  if (status !== "success" || settings == null) {
    return <></>;
  }

  return (
    <FretboardOptionsContainer>
      <SwitchControl
        value={settings.mode === "Interactive"}
        label={"Interactive"}
        onChange={(value) =>
          updateSettings({ ...settings, mode: value ? "Interactive" : "Inert" })
        }
      />
    </FretboardOptionsContainer>
  );
};
