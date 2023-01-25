import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { defaultBoxShadow } from "../consts";

export interface AccordionProps {
  title: React.ReactNode;
  open?: boolean;
  children: React.ReactNode;
}

const AccordionContainer = styled(motion.div)`
  box-shadow: ${defaultBoxShadow};
  padding: 10px;
  overflow: hidden;
`;

const AccordionHeader = styled(motion.div)`
  cursor: pointer;
`;

const AccordionContentDisplay = styled(motion.section)``;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  open,
}) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false);
  return (
    <AccordionContainer>
      <AccordionHeader
        initial={false}
        onClick={() => setIsOpen(!isOpen)}
      >
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
