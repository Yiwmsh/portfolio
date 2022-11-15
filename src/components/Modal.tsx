import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

const Underlay = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal: React.FC<{
  children?: React.ReactNode;
  isOpen: boolean;
}> = ({ children, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Underlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </Underlay>
      )}
    </AnimatePresence>
  );
};
