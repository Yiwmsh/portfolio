import { Button } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { SwitchControl } from "../../../components/SwitchControl";
import { useEditFretboardSettings } from "../../../hooks/useEditFretboardSettings";
import { useFretboardSettings } from "../../../hooks/useFretboardSettings";
import { DEFAULT_FRETBOARD_SETTINGS } from "./Fretboard";
import { FretboardContext } from "./FretboardDashboard";

const FretboardOptionsContainer = styled.div``;

interface FretboardOptionsProps {}

export const FretboardOptions: React.FC<FretboardOptionsProps> = ({}) => {
  const { data: settings, status } = useFretboardSettings();
  const { mutate: updateSettings } = useEditFretboardSettings();
  const { clearSelectedFrets, selectedFrets } =
    React.useContext(FretboardContext);

  if (settings == null) {
    updateSettings(DEFAULT_FRETBOARD_SETTINGS);
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
      <SwitchControl
        label="Audible fretting"
        value={settings.playbackOptions.onFretClick}
        onChange={(value) => {
          updateSettings({
            ...settings,
            playbackOptions: {
              ...settings.playbackOptions,
              onFretClick: value,
            },
          });
        }}
      />
      <Button
        onPress={() => {
          clearSelectedFrets();
        }}
        isDisabled={selectedFrets.length === 0}
      >
        Reset
      </Button>
    </FretboardOptionsContainer>
  );
};
