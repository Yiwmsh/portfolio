import { TextField } from "@yiwmsh/react-carpentry";
import React from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";

const HorizontalTextField = styled(TextField)`
  display: flex;
  flex-direction: row;
`;

export const nameChangeEvent = new Event("onNameChange");

export const WhatsYourName: React.FC<{ withDescription?: boolean }> = ({
  withDescription = false,
}) => {
  const storedName = localStorage.getItem("name");

  const [text, setText] = React.useState(storedName ?? "Friend");
  const [name, setName] = React.useState(text);

  useEffect(() => {
    localStorage.setItem("name", name);
    dispatchEvent(nameChangeEvent);
  }, [name]);

  return (
    <HorizontalTextField
      description={withDescription ? "What should I call you?" : ""}
      aria-label="Name"
      defaultValue={text}
      value={text}
      onChange={setText}
      onFocus={() => setText("")}
      onBlur={() => {
        if (text === "") {
          setText(name);
        } else {
          setName(text);
        }
      }}
    />
  );
};
