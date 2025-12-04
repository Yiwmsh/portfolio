import styled from "@emotion/styled";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const TableOfContentsContainer = styled.div`
  position: fixed;
  border: 1px solid black;
  padding: 10px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
`;

export interface Header {
  headerTier: number;
  title: string;
  accordionID?: string;
}

const AccordionContainer = styled(motion.div)`
  overflow: hidden;
`;

const AccordionHeader = styled(motion.div)`
  cursor: pointer;
`;

const AccordionTitle = styled.div`
  display: inline-block;
`;

const AccordionHeaderArrow = styled(motion.div)`
  display: inline-block;
`;

const AccordionContentDisplay = styled(motion.section)`
  margin-left: 10px;
`;

const TableOfContentsEntry = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

const TableOfContentsAccordion: React.FC<{
  title: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  accordionID?: string;
}> = ({ title, children, accordionID, open = false }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(open);
  const tableAccordionClickedEventName = `table_${accordionID}_clicked`;
  const tableAccordionClickedListener = (details: CustomEventInit<boolean>) => {
    const detail = details.detail;
    if (detail) {
      setIsOpen(detail);
    }
  };

  React.useEffect(() => {
    document.addEventListener(
      tableAccordionClickedEventName,
      tableAccordionClickedListener
    );

    return () => {
      document.removeEventListener(
        tableAccordionClickedEventName,
        tableAccordionClickedListener
      );
    };
  }, []);
  return (
    <AccordionContainer>
      <AccordionHeader initial={false}>
        <AccordionHeaderArrow
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "ease" }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (accordionID) {
              const documentAccordionClickedEvent = new CustomEvent(
                `document_${accordionID}_clicked`,
                { detail: isOpen }
              );
              document.dispatchEvent(documentAccordionClickedEvent);
            }
          }}
        >
          &#10148;
        </AccordionHeaderArrow>{" "}
        {title}
      </AccordionHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <AccordionContentDisplay
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </AccordionContentDisplay>
        )}
      </AnimatePresence>
    </AccordionContainer>
  );
};

const recursiveParseHeaders = (headers: Header[]): React.ReactNode[] => {
  const retVal: React.ReactNode[] = [];
  for (let cursor = 0; cursor < headers.length; cursor++) {
    let lookahead = cursor + 1;
    while (
      lookahead < headers.length &&
      headers[lookahead].headerTier > headers[cursor].headerTier
    ) {
      lookahead++;
    }
    const subHeaders = headers.slice(cursor + 1, lookahead);
    const header = headers[cursor];

    if (subHeaders.length === 0) {
      retVal.push(
        <TableOfContentsEntry
          onClick={() => {
            document
              .getElementById(
                `header-${header.title.replaceAll(" ", "-").toLowerCase()}`
              )
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
          }}
        >
          {header.title}
        </TableOfContentsEntry>
      );
    } else {
      retVal.push(
        <TableOfContentsAccordion
          accordionID={header.accordionID ?? undefined}
          title={
            <AccordionTitle
              onClick={() => {
                document
                  .getElementById(
                    `header-${header.title.replaceAll(" ", "-").toLowerCase()}`
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
              }}
            >
              {header.title}
            </AccordionTitle>
          }
        >
          {recursiveParseHeaders(subHeaders)}
        </TableOfContentsAccordion>
      );
      cursor = lookahead - 1;
    }
  }

  return retVal;
};

export const RichTextTableOfContents: React.FC<{
  headers: Header[];
}> = ({ headers }) => {
  return (
    <TableOfContentsContainer>
      {recursiveParseHeaders(headers)}
    </TableOfContentsContainer>
  );
};
