import { TextField } from "@yiwmsh/react-carpentry";
import React from "react";
import styled from "@emotion/styled";

const HorizontalTextField = styled(TextField)`
  display: flex;
  flex-direction: row;
`;

export const WhatsYourName: React.FC = () => {
  const [text, setText] = React.useState("Friend");
  const [name, setName] = React.useState(text);
  return (
    <HorizontalTextField
      description="What should I call you?"
      defaultValue={text}
      value={text}
      onChange={setText}
      onFocus={() => setText("")}
      onBlur={() => {
        if (text === "") {
          setText(name);
        }
        setName(text);
      }}
    />
  );
};
