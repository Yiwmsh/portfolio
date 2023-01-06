import React from "react";
import styled from "@emotion/styled";

enum RichTextDecoration {
  content = "<>",
  bold = "<b>",
  italic = "<i>",
  h1 = "<h1>",
  h2 = "<h2>",
  h3 = "<h3>",
  break = "<br/>",
  p = "<p>",
  image = "<img>",
  picture = "<pic>",
  video = "<vid>",
  literal = "<lit>",
  code = "```",
}

const decorations = Object.values(RichTextDecoration);
const openingSymbols = new Set(decorations.map((decoration) => decoration[0]));
console.log(openingSymbols);

const longestTagLength = () => {
  const sortedDecorations = Object.values(RichTextDecoration).sort(
    (a, b) => b.length - a.length
  );
  return sortedDecorations[0].length;
};

const shortestTagLength = () => {
  const sortedDecorations = Object.values(RichTextDecoration).sort(
    (a, b) => a.length - b.length
  );
  return sortedDecorations[0].length;
};

const maxLookaheadLength = longestTagLength() + 1;
const minLookaheadLength = shortestTagLength() + 1;

const RichTextBold = styled.b``;
const RichTextItalic = styled.i``;
const RichTextH1 = styled.h1``;
const RichTextH2 = styled.h2``;
const RichTextH3 = styled.h3``;
const RichTextBreak = styled.br``;
const RichTextP = styled.p``;
const RichTextImg = styled.img``;
const RichTextVid = styled.iframe``;
const RichTextCode = styled.div`
  background-color: #708090;
  color: white;
`;

interface Tag {
  tag: string;
  tagStart: number;
  tagEnd: number;
}

const isSelfClosing = (tag: Tag): boolean => {
  return tag.tag === RichTextDecoration.break;
};

const getExpectedClosingTag = (tag: Tag): string => {
  if (tag.tag === "```") {
    return "```";
  }
  const symbol = tag.tag.replace("<", "").replace(">", "");
  return `</${symbol}>`;
};

const checkTag = (content: string, cursor: number): Tag | false => {
  for (
    let lookaheadCursor = 1;
    lookaheadCursor < maxLookaheadLength;
    lookaheadCursor++
  ) {
    const slice = content.slice(cursor, lookaheadCursor + cursor);
    if (decorations.some((decoration) => decoration === slice)) {
      return { tag: slice, tagStart: cursor, tagEnd: lookaheadCursor + cursor };
    }
  }
  return false;
};

const findClosingTag = (openingTag: Tag, content: string): Tag | false => {
  const expectedClosingTag = getExpectedClosingTag(openingTag);
  for (let cursor = openingTag.tagEnd; cursor < content.length; cursor++) {
    if (content[cursor] === expectedClosingTag[0]) {
      for (
        let lookaheadCursor = 0;
        lookaheadCursor < maxLookaheadLength + 1;
        lookaheadCursor++
      ) {
        const slice = content.slice(cursor, lookaheadCursor + cursor);
        if (slice === expectedClosingTag) {
          return {
            tag: slice,
            tagStart: cursor,
            tagEnd: cursor + lookaheadCursor,
          };
        }
      }
    }
  }
  return false;
};

const taggedContentToReactNode = (
  tag: string,
  content: string
): React.ReactNode => {
  switch (tag) {
    case RichTextDecoration.literal:
      return <>{content}</>;
    case RichTextDecoration.code:
      return <RichTextCode>{content}</RichTextCode>;
  }
  const containsInnerTags = decorations.some((decoration) =>
    content.includes(decoration)
  );
  const innerContent = containsInnerTags ? recursiveParser(content) : content;
  switch (tag) {
    case RichTextDecoration.bold:
      return <RichTextBold>{innerContent}</RichTextBold>;
    case RichTextDecoration.content:
      return <>{innerContent}</>;
    case RichTextDecoration.h1:
      return <RichTextH1>{innerContent}</RichTextH1>;
    case RichTextDecoration.h2:
      return <RichTextH2>{innerContent}</RichTextH2>;
    case RichTextDecoration.h3:
      return <RichTextH3>{innerContent}</RichTextH3>;
    case RichTextDecoration.picture:
    case RichTextDecoration.image:
      try {
        return <RichTextImg src={innerContent as string} />;
      } catch (e) {
        console.log(e);
      }
      break;
    case RichTextDecoration.italic:
      return <RichTextItalic>{innerContent}</RichTextItalic>;
    case RichTextDecoration.p:
      return <RichTextP>{innerContent}</RichTextP>;
    case RichTextDecoration.video:
      try {
        return <RichTextVid src={innerContent as string} />;
      } catch (e) {
        console.log(e);
      }
      break;
    case RichTextDecoration.code:
      return <RichTextCode>{innerContent}</RichTextCode>;
  }
  return <>{innerContent}</>;
};

const recursiveParser = (content: string): React.ReactNode => {
  let retVal: React.ReactNode[] = [<></>];
  let lastTagEnd = 0;
  for (let cursor = 0; cursor < content.length; cursor++) {
    if (openingSymbols.has(content[cursor])) {
      const openTag = checkTag(content, cursor);
      if (openTag) {
        if (isSelfClosing(openTag)) {
          switch (openTag.tag) {
            case RichTextDecoration.break:
              const preTagContent = content.slice(lastTagEnd, openTag.tagStart);
              retVal.push(<>{preTagContent}</>);
              retVal.push(<br />);
              cursor = openTag.tagEnd;
              lastTagEnd = cursor;
          }
        } else {
          const closeTag = findClosingTag(openTag, content);
          if (closeTag) {
            const innerContent = content.slice(
              openTag.tagEnd,
              closeTag.tagStart
            );
            const preTagContent = content.slice(lastTagEnd, openTag.tagStart);
            retVal.push(<>{preTagContent}</>);
            retVal.push(taggedContentToReactNode(openTag.tag, innerContent));
            cursor = closeTag.tagEnd;
            lastTagEnd = cursor;
          }
        }
      }
    }
  }
  const trailingContent = content.slice(lastTagEnd, content.length);
  retVal.push(trailingContent);
  return retVal;
};

export const RichTextDisplay: React.FC<{ content: string }> = ({ content }) => {
  return <>{recursiveParser(content)}</>;
};