import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { SemanticColors } from "@chrisellis/react-carpentry";

const ScrollButtonStyle = styled.button<{ direction: "up" | "down" }>`
  padding: 15px;
  border-left: 2px solid var(${SemanticColors.altText});
  border-bottom: 2px solid var(${SemanticColors.altText});
  border-radius: 0%;
  transform: ${({ direction }) =>
    direction === "up" ? `rotate(135deg)` : `rotate(-45deg)`};
  background-color: transparent;
  border-right: 0px transparent;
  border-top: 0px transparent;
  cursor: pointer;
`;

export const ScrollButton: React.FC<{
  direction: "up" | "down";
  target: string;
}> = ({ direction, target }) => {
  return (
    <motion.div initial={{ opacity: 0.5 }} whileHover={{ opacity: 1 }}>
      <motion.div
        style={{ margin: "0 auto" }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          type: "spring",
        }}
      >
        <ScrollButtonStyle
          direction={direction}
          onClick={() =>
            document.getElementById(target)?.scrollIntoView({
              behavior: "smooth",
            })
          }
        />
      </motion.div>
    </motion.div>
  );
};
