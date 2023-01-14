import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionContainer = styled(motion.div)``;

const AccordionButton = styled.button``;

const AccordionContentDisplay = styled(motion.div)``;

export const AccordionContent: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ children, isOpen }) => {
  return (
    <>
      {isOpen ? (
        <AccordionContentDisplay>{children}</AccordionContentDisplay>
      ) : (
        ""
      )}
    </>
  );
};

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
      <AccordionContent children={children} isOpen={isOpen}></AccordionContent>
    </AccordionContainer>
  );
};
