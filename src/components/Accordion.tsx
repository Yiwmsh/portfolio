import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { defaultBoxShadow } from "../consts";

export interface AccordionProps {
  title: React.ReactNode;
  startOpen?: boolean;
  children: React.ReactNode;
}

export interface AccordionBaseProps {
  title: React.ReactNode;
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
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
  startOpen,
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AccordionBase
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      children={children}
    />
  );
};

export const AccordionBase: React.FC<AccordionBaseProps> = ({
  title,
  children,
  isOpen,
  setIsOpen,
}) => {
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
