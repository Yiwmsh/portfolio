import { TextContent } from "@chrisellis/react-carpentry";
import React from "react";
import {
  RichTextBold,
  RichTextBorderedSection,
  RichTextCard,
  RichTextCentered,
  RichTextCode,
  RichTextH1,
  RichTextH2,
  RichTextH3,
  RichTextImg,
  RichTextItalic,
  RichTextLink,
  RichTextP,
  RichTextPaddedSection,
  RichTextShadowedSection,
  RichTextStrikeThrough,
  RichTextSubscript,
  RichTextSuperscript,
  RichTextVid,
} from "./richTextStyledComponents";

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
  link = "<a>",
  borderedSection = "<border>",
  centered = "<center>",
  shadowedSection = "<shadow>",
  paddedSection = "<pad>",
  card = "<card>",
  strikethrough = "<s>",
  subscript = "<sub>",
  superscript = "<sup>",
  collapse = "<collapse>",
}

const decorations = Object.values(RichTextDecoration);
const openingSymbols = new Set(decorations.map((decoration) => decoration[0]));

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

const parseLink = (innerContent: string): { link: string; text: string } => {
  const urlRegex = /(?:{(.*)})/gm;
  const link = innerContent.match(urlRegex)?.[0].replaceAll(/[{}]/gm, "");
  const text = innerContent.replace(urlRegex, "").replaceAll(/[{}]/gm, "");
  return { link: link ?? "", text: text };
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
    case RichTextDecoration.subscript:
      return <RichTextSubscript>{innerContent}</RichTextSubscript>;
    case RichTextDecoration.superscript:
      return <RichTextSuperscript>{innerContent}</RichTextSuperscript>;
    case RichTextDecoration.strikethrough:
      return <RichTextStrikeThrough>{innerContent}</RichTextStrikeThrough>;
    case RichTextDecoration.shadowedSection:
      return <RichTextShadowedSection>{innerContent}</RichTextShadowedSection>;
    case RichTextDecoration.paddedSection:
      return <RichTextPaddedSection>{innerContent}</RichTextPaddedSection>;
    case RichTextDecoration.card:
      return <RichTextCard>{innerContent}</RichTextCard>;
    case RichTextDecoration.centered:
      return <RichTextCentered>{innerContent}</RichTextCentered>;
    case RichTextDecoration.borderedSection:
      return <RichTextBorderedSection>{innerContent}</RichTextBorderedSection>;
    case RichTextDecoration.link:
      const linkValues = parseLink(content);
      return (
        <RichTextLink href={linkValues.link}>{linkValues.text}</RichTextLink>
      );
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
              cursor = openTag.tagEnd - 1;
              lastTagEnd = openTag.tagEnd;
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
            cursor = closeTag.tagEnd - 1;
            lastTagEnd = closeTag.tagEnd;
          }
        }
      }
    }
  }
  const trailingContent = content.slice(lastTagEnd, content.length);
  retVal.push(trailingContent);
  return retVal;
};

const autoAddParagraphs = (content: string): string => {
  const paragraphRegex = /^([^\r\n]+[\r\n]{0,1})+(\n|$)/gm;
  const paragraphs = content.replaceAll(
    paragraphRegex,
    (substring) => `<p>${substring.trim()}</p>`
  );

  return paragraphs.replaceAll("\n", "<br/>");
};

const parseRichText = (content: string): React.ReactNode => {
  return recursiveParser(autoAddParagraphs(content));
};

export const RichTextDisplay: React.FC<{ content: string }> = ({ content }) => {
  return <TextContent>{parseRichText(content)}</TextContent>;
};
