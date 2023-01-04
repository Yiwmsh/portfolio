import React from "react";
import styled from "@emotion/styled";

enum RichTextDecoration {
  bold = "b",
  italic = "i",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  break = "br",
  p = "p",
}

const RichTextBold = styled.b``;
const RichTextItalic = styled.i``;
const RichTextH1 = styled.h1``;
const RichTextH2 = styled.h2``;
const RichTextH3 = styled.h3``;
const RichTextBreak = styled.br``;
const RichTextP = styled.p``;

export const parseRichText = (content: string): React.ReactNode => {
  const globalPattern =
    /(?:<(.)>([\w\W]*)(<\/\1>))|(<br\/>)|(?<!<.>)([^<>]+)(?!<\/.>)/gm;
  const pattern = /(?:<(.)>([\w\W]*)(<\/\1>))|(<br\/>)/m;
  let match;
  let retVal = [];
  while ((match = globalPattern.exec(content)) !== null) {
    if (match[0] === "<br/>") {
      retVal.push(<RichTextBreak />);
    } else if (!match[1]) {
      retVal.push(<>{match[0]}</>);
    } else {
      const innerContent =
        match[2].match(pattern) !== null ? parseRichText(match[2]) : match[2];
      switch (match[1]) {
        case RichTextDecoration.bold:
          retVal.push(<RichTextBold>{innerContent}</RichTextBold>);
          break;
        case RichTextDecoration.italic:
          retVal.push(<RichTextItalic>{innerContent}</RichTextItalic>);
          break;
        case RichTextDecoration.p:
          retVal.push(<RichTextP>{innerContent}</RichTextP>);
          break;
        case RichTextDecoration.h1:
          retVal.push(<RichTextH1>{innerContent}</RichTextH1>);
          break;
        case RichTextDecoration.h2:
          retVal.push(<RichTextH2>{innerContent}</RichTextH2>);
          break;
        case RichTextDecoration.h3:
          retVal.push(<RichTextH3>{innerContent}</RichTextH3>);
          break;
      }
    }
  }

  return retVal.length > 0 ? retVal : <>{content}</>;
};

export const RichTextDisplay: React.FC<{ content: string }> = ({ content }) => {
  return <>{parseRichText(content)}</>;
};
