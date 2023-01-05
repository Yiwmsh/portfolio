import React from "react";
import { TextFieldProps } from "@react-types/textfield";
import styled from "@emotion/styled";

const RichTextInput = styled.textarea`
  min-height: 20vh;
  resize: both;
`;

export const RichTextEditor: React.FC<TextFieldProps> = ({
  onChange,
  ...rest
}) => {
  const handleChange = (value: string) => {
    console.log(value);
    onChange?.(value);
  };
  return (
    <RichTextInput
      onChange={(event) => handleChange(event.target.value)}
      {...rest}
    />
  );
};
