import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionContainer = styled(motion.div)``;

const AccordionButton = styled.button``;

const AccordionContent = styled(motion.div)<{ isOpen: boolean }>`
  visibility: ${(isOpen) => (isOpen ? "visible" : "hidden")};
`;

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AccordionContainer layout>
      <AccordionButton
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
      >
        {title}
      </AccordionButton>
      <AnimatePresence>
        <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
      </AnimatePresence>
    </AccordionContainer>
  );
};
