import { TextField } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { NameContext } from "../pages/site";

const HorizontalTextField = styled(TextField)`
  display: flex;
  flex-direction: row;
`;

export const nameChangeEvent = new Event("onNameChange");

export const WhatsYourName: React.FC<{ withDescription?: boolean }> = ({
  withDescription = false,
}) => {
  const { name, setName } = React.useContext(NameContext);

  const storedName = localStorage.getItem("name");

  const [text, setText] = React.useState(storedName ?? "Friend");

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
