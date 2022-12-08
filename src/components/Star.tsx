import { motion } from "framer-motion";
import React from "react";
import styled from "@emotion/styled";

const StarStyle = styled(motion.path)`
  z-index: -2;
`;

export interface Coordinate {
  x: number;
  y: number;
}

export interface StarData {
  coordinates: Coordinate;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
  session?: boolean;
}

export const Star: React.FC<StarData> = ({
  coordinates,
  scale,
  rotation,
  delay,
  duration,
  session,
}) => {
  return (
    <motion.g
      initial={{
        opacity: session ? 1 : 0,
        scale: session ? scale : 0,
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
          duration: duration + 2,
          delay: delay,
          repeat: Infinity,
          repeatDelay: delay,
        }}
      />
    </motion.g>
  );
};
