import styled from "@emotion/styled";
import { TextFieldProps } from "@react-types/textfield";
import { motion } from "framer-motion";
import React from "react";
import {
  RichTextDecoration,
  getExpectedClosingTag,
  tagIsVariable,
} from "./RichTextDisplay";

const RichTextInput = styled.textarea`
  min-height: 20vh;
  resize: both;
`;

const RichTextButtonsContainer = styled.div``;

const RichTextButton = styled(motion.button)`
  border-radius: 0px;
  border: 1px solid black;
`;

export const RichTextEditor: React.FC<TextFieldProps> = ({
  onChange,
  ...rest
}) => {
  const setText = (value: string) => {
    onChange?.(value);
  };

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const interposeTag = (openingTag: string, variable?: boolean) => {
    const selectionStart = inputRef.current?.selectionStart;
    const selectionEnd = inputRef.current?.selectionEnd;
    const selectedText = inputRef.current?.value.slice(
      selectionStart,
      selectionEnd
    );
    const preText = inputRef.current?.value.slice(0, selectionStart);
    const postText = inputRef.current?.value.slice(selectionEnd);
    const closingTag = getExpectedClosingTag({
      tag: openingTag,
      tagStart: 0,
      tagEnd: 0,
    });
    onChange?.(
      `${preText}${openingTag}${
        variable ? "{}" : ""
      }${selectedText}${closingTag}${postText}`
    );
  };

  return (
    <>
      <RichTextButtonsContainer>
        {Object.entries(RichTextDecoration).map((entry) => {
          return (
            <RichTextButton
              onClick={() => interposeTag(entry[1], tagIsVariable(entry[1]))}
            >
              {entry[0]}
            </RichTextButton>
          );
        })}
      </RichTextButtonsContainer>
      <RichTextInput
        ref={inputRef}
        onChange={(event) => setText(event.target.value)}
        {...rest}
      />
    </>
  );
};
