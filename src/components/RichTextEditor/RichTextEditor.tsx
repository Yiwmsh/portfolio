import styled from "@emotion/styled";
import { TextFieldProps } from "@react-types/textfield";
import React from "react";

const RichTextInput = styled.textarea`
  min-height: 20vh;
  resize: both;
`;

export const RichTextEditor: React.FC<TextFieldProps> = ({
  onChange,
  ...rest
}) => {
  const handleChange = (value: string) => {
    onChange?.(value);
  };
  return (
    <RichTextInput
      onChange={(event) => handleChange(event.target.value)}
      {...rest}
    />
  );
};
