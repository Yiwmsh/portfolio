import styled from "@emotion/styled";
import React from "react";
import { SwitchControl } from "../../../components/SwitchControl";
import { useEditFretboardSettings } from "../../../hooks/useEditFretboardSettings";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { FretboardContext } from "./FretboardDashboard";

const FretboardOptionsContainer = styled.div``;

interface FretboardOptionsProps {}

export const FretboardOptions: React.FC<FretboardOptionsProps> = ({}) => {
  const { data: settings, status } = useFretboardSettings();
  const { mutate: updateSettings } = useEditFretboardSettings();
  const { clearSelectedFrets } = React.useContext(FretboardContext);

  if (settings == null) {
    updateSettings({
      mode: "Interactive",
      selectionMode: "Multiple",
      orientation: "Horizontal",
      stringCount: 6,
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
      <SwitchControl
        value={settings.orientation === "Horizontal"}
        label="Orientation"
        onChange={(value) =>
          updateSettings({
            ...settings,
            orientation: value ? "Horizontal" : "Vertical",
          })
        }
        trueValueLabel="Horizontal"
        falseValueLabel="Vertical"
        lateral
      />
      <SwitchControl
        label="Selection Mode"
        value={settings.selectionMode === "Multiple"}
        onChange={(value) => {
          updateSettings({
            ...settings,
            selectionMode: value ? "Multiple" : "Single",
          });
          if (!value) {
            clearSelectedFrets();
          }
        }}
        trueValueLabel="Scale"
        falseValueLabel="Chord"
        lateral
      />
    </FretboardOptionsContainer>
  );
};
