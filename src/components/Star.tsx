import { motion } from "framer-motion";
import React from "react";
import styled from "@emotion/styled";

const StarStyle = styled(motion.path)`
  z-index: -2;
`;

export const Star: React.FC<{ coordinates: { x: number; y: number } }> = ({
  coordinates,
}) => {
  const scale = Math.random() * (0.8 - 0.2) + 0.2;
  const rotation = Math.random() * 360;
  const randomDelay = Math.random() * 10;
  const randomDuration = Math.random() * 5;
  return (
    <motion.g
      initial={{
        opacity: 0,
        scale: 0,
        x: `${coordinates.x}vw`,
        y: `${coordinates.y}vh`,
      }}
      animate={{ opacity: 1, scale: scale }}
      transition={{ duration: 1, delay: 4 }}
    >
      <StarStyle
        d="M 4.5 4.5 L 2.5 2.5 L 4 5 L 0 5 L 4 5.5 L 2.5 7.5 L 4.5 6 L 5 10 L 5.5 6 L 7.5 7.5 L 6 5.5 L 10 5 L 6 5 L 7.5 2.5 L 5.5 4.5 L 5 0 Z"
        stroke="#ffffff"
        fill="#ffffff"
        initial={{ rotate: rotation }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: randomDuration + 2,
          delay: randomDelay,
          repeat: Infinity,
          repeatDelay: randomDelay,
        }}
      />
    </motion.g>
  );
};
