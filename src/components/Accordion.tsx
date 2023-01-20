import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { defaultBoxShadow } from "../consts";

export interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const AccordionContainer = styled(motion.div)`
  box-shadow: ${defaultBoxShadow};
`;

const AccordionHeader = styled.div``;

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
      <AccordionHeader
        onClick={() => {
          setIsOpen(!isOpen);
          console.log(isOpen);
        }}
      >
        {title}
      </AccordionHeader>
      <AccordionContent
        children={children}
        isOpen={isOpen}
      ></AccordionContent>
    </AccordionContainer>
  );
};
