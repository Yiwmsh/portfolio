import styled from "@emotion/styled";
import { motion } from "motion/react";
import React from "react";
import {
  RichTextDecoration,
  getExpectedClosingTag,
  tagIsVariable,
} from "./RichTextDisplay";

const RichTextButtonsContainer = styled.div``;

const RichTextButton = styled(motion.button)`
  border-radius: 0px;
  border: 1px solid black;
`;

interface RichTextEditorProps {
  onChange?: (value: string) => void;
  value: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onChange,
  value,
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
    const newValue = `${preText}${openingTag}${
      variable ? "{}" : ""
    }${selectedText}${closingTag}${postText}`;
    onChange?.(newValue);
    // inputRef.current?.focus();
    // inputRef.current?.setSelectionRange(
    //   selectionStart ? selectionStart + openingTag.length : null,
    //   selectionEnd ? selectionEnd + openingTag.length : null
    // );
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
      <textarea
        style={{
          minHeight: "20vh",
          resize: "both",
        }}
        ref={inputRef}
        onChange={(event) => setText(event.target.value)}
        value={value}
      />
    </>
  );
};
