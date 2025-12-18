import { TextContent } from "@chrisellis/react-carpentry";
import { uuidv4 } from "@firebase/util";
import React, { useEffect } from "react";
import { AccordionBase } from "../Accordion";
import { RichTextQuote } from "./RichTextQuote";
import { RichTextSpoiler } from "./RichTextSpoiler";
import { Header, RichTextTableOfContents } from "./RichTextTableOfContents";
import {
  RichTextBold,
  RichTextBorderedSection,
  RichTextCard,
  RichTextCentered,
  RichTextCode,
  RichTextColumn,
  RichTextH1,
  RichTextH2,
  RichTextH3,
  RichTextH4,
  RichTextH5,
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

export enum RichTextDecoration {
  content = "<>",
  bold = "<b>",
  italic = "<i>",
  h1 = "<h1>",
  h2 = "<h2>",
  h3 = "<h3>",
  h4 = "<h4>",
  h5 = "<h5>",
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
  quote = "<q>",
  spoiler = "<spoiler>",
  column = "<col>",
}

const decorations = Object.values(RichTextDecoration);
const openingSymbols = new Set(decorations.map((decoration) => decoration[0]));

export const tagIsVariable = (tag: string) => {
  switch (tag) {
    case RichTextDecoration.link:
    case RichTextDecoration.paddedSection:
    case RichTextDecoration.collapse:
    case RichTextDecoration.quote:
    case RichTextDecoration.column:
      return true;
    default:
      return false;
  }
};

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
const minLookaheadLength = shortestTagLength();

export interface Tag {
  tag: string;
  tagStart: number;
  tagEnd: number;
}

const isSelfClosing = (tag: Tag): boolean => {
  return tag.tag === RichTextDecoration.break;
};

export const getExpectedClosingTag = (tag: Tag): string => {
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
  let openingTagCount = 1;
  let closingTagCount = 0;
  let lastClosingTagFound: Tag;
  for (let cursor = openingTag.tagEnd; cursor < content.length; cursor++) {
    if (
      content[cursor] === expectedClosingTag[0] ||
      content[cursor] === openingTag.tag[0]
    ) {
      for (
        let lookaheadCursor = minLookaheadLength;
        lookaheadCursor < maxLookaheadLength + 1;
        lookaheadCursor++
      ) {
        const slice = content.slice(cursor, lookaheadCursor + cursor);
        if (slice === expectedClosingTag) {
          closingTagCount++;
          lastClosingTagFound = {
            tag: slice,
            tagStart: cursor,
            tagEnd: cursor + lookaheadCursor,
          };

          if (closingTagCount === openingTagCount) {
            return lastClosingTagFound;
          }
        }

        if (slice === openingTag.tag) {
          openingTagCount++;
        }
      }
    }
  }
  return false;
};

const parseVariableTag = (
  innerContent: string
): { variable: string; text: string } => {
  const variableRegex = /(?:{([^}]*)})/gm;
  const variable = innerContent
    .match(variableRegex)?.[0]
    .replaceAll(/[{}]/gm, "");
  const text = innerContent.slice(variable ? variable.length + 2 : 0);
  return { variable: variable ?? "", text: text };
};

const taggedContentToReactNode = (
  tag: string,
  content: string,
  addHeader: (header: Header) => void
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
  let tagIsHeader = false;
  switch (tag) {
    case RichTextDecoration.h1:
    case RichTextDecoration.h2:
    case RichTextDecoration.h3:
    case RichTextDecoration.h4:
      tagIsHeader = true;
      break;
    default:
      break;
  }

  const innerContent = containsInnerTags
    ? recursiveParser(content, tagIsHeader ? (header: Header) => {} : addHeader)
    : content;

  const headerText = innerContent ? innerContent.toString() : "";

  switch (tag) {
    case RichTextDecoration.column:
      const variableContent = parseVariableTag(content);
      try {
        return (
          <RichTextColumn
            columnCount={variableContent.variable as unknown as number}
          >
            {recursiveParser(variableContent.text, addHeader)}
          </RichTextColumn>
        );
      } catch (e) {
        console.log(e);
        return <></>;
      }
    case RichTextDecoration.spoiler:
      return <RichTextSpoiler>{innerContent}</RichTextSpoiler>;
    case RichTextDecoration.subscript:
      return <RichTextSubscript>{innerContent}</RichTextSubscript>;
    case RichTextDecoration.collapse:
      const collapseValues = parseVariableTag(content);

      let accordionHeader: Header = { title: "", headerTier: 1 };

      const accordionTitle = recursiveParser(
        collapseValues.variable,
        (header: Header) => {
          accordionHeader = header;
        }
      );

      const accordionID = uuidv4();
      accordionHeader.accordionID = accordionID;
      addHeader(accordionHeader);

      const RichTextAccordion: React.FC<{ accordionID: string }> = ({
        accordionID,
      }) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const documentAccordionClickedEventName = `document_${accordionID}_clicked`;
        const documentAccordionClickedListener = (
          details: CustomEventInit<boolean>
        ) => {
          const detail = details.detail;
          if (detail) {
            setIsOpen(detail);
          }
        };
        useEffect(() => {
          document.addEventListener(
            documentAccordionClickedEventName,
            documentAccordionClickedListener
          );
          return () => {
            document.removeEventListener(
              documentAccordionClickedEventName,
              documentAccordionClickedListener
            );
          };
        }, []);

        return (
          <AccordionBase
            title={accordionTitle}
            isOpen={isOpen}
            setIsOpen={(value: boolean) => {
              setIsOpen(value);
              const tableAccordionClickedEvent = new CustomEvent(
                `table_${accordionID}_clicked`,
                { detail: value }
              );
              document.dispatchEvent(tableAccordionClickedEvent);
            }}
          >
            {recursiveParser(collapseValues.text, addHeader)}
          </AccordionBase>
        );
      };
      return <RichTextAccordion accordionID={accordionID} />;
    case RichTextDecoration.quote:
      const quoteContents = parseVariableTag(content);
      return (
        <RichTextQuote
          quote={quoteContents.text}
          quoteSource={quoteContents.variable}
        />
      );
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
      const linkValues = parseVariableTag(content);
      return (
        <RichTextLink href={linkValues.variable}>
          {linkValues.text}
        </RichTextLink>
      );
    case RichTextDecoration.bold:
      return <RichTextBold>{innerContent}</RichTextBold>;
    case RichTextDecoration.content:
      return <>{innerContent}</>;
    case RichTextDecoration.h1:
      addHeader({
        headerTier: 1,
        title: headerText,
      });
      return (
        <RichTextH1
          id={`header-${headerText.replaceAll(" ", "-").toLowerCase()}`}
        >
          {innerContent}
        </RichTextH1>
      );
    case RichTextDecoration.h2:
      addHeader({
        headerTier: 2,
        title: headerText,
      });
      return (
        <RichTextH2
          id={`header-${headerText.replaceAll(" ", "-").toLowerCase()}`}
        >
          {innerContent}
        </RichTextH2>
      );
    case RichTextDecoration.h3:
      addHeader({
        headerTier: 3,
        title: headerText,
      });
      return (
        <RichTextH3
          id={`header-${headerText.replaceAll(" ", "-").toLowerCase()}`}
        >
          {innerContent}
        </RichTextH3>
      );
    case RichTextDecoration.h4:
      addHeader({
        headerTier: 4,
        title: headerText,
      });
      return (
        <RichTextH4
          id={`header-${headerText.replaceAll(" ", "-").toLowerCase()}`}
        >
          {innerContent}
        </RichTextH4>
      );
    case RichTextDecoration.h5:
      addHeader({
        headerTier: 5,
        title: headerText,
      });
      return (
        <RichTextH5
          id={`header-${headerText.replaceAll(" ", "-").toLowerCase()}`}
        >
          {innerContent}
        </RichTextH5>
      );
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

const recursiveParser = (
  content: string,
  addHeader: (header: Header) => void
): React.ReactNode => {
  let retVal: React.ReactNode[] = [];
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
            retVal.push(
              taggedContentToReactNode(openTag.tag, innerContent, addHeader)
            );
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

  return content.replaceAll("\n", "<br/>");
};

const parseRichText = (
  content: string
): {
  parsedContent: React.ReactNode;
  headers: Header[];
} => {
  const headers: Header[] = [];
  const addHeader = (header: Header) => {
    headers.push(header);
  };
  const test = true;
  const setTest = (value: boolean) => {};
  const parsedContent = recursiveParser(autoAddParagraphs(content), addHeader);
  return {
    parsedContent: parsedContent,
    headers: headers,
  };
};

export const RichTextDisplay: React.FC<{
  content: string;
  withTableOfContents?: boolean;
}> = ({ content, withTableOfContents = false }) => {
  const { parsedContent, headers } = parseRichText(content);
  return (
    <>
      {withTableOfContents && <RichTextTableOfContents headers={headers} />}
      <TextContent>{parsedContent}</TextContent>
    </>
  );
};
