import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Star } from "./Star";

const Sun = styled(motion.circle)``;

const SUN_TRANSITION = {
  type: "spring",
  duration: 3,
  delay: 2,
  stiffness: 10,
  damping: 5,
  mass: 1,
};

const SUN_RAY_TRANSITION = {
  delay: 3.8,
  duration: 0.1,
  type: "spring",
  stiffness: 50,
  damping: 10,
  mass: 5,
};

const SUN_RAY_PATH = "M 11 61 C 4 63 -4 63 -11 61 L 0 80 L 11 61";

const generateRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/***
 * @excludeFloor The lowest number you wish to exclude from the range of generated numbers. This value is inclusive.
 * @excludeCeiling The highest number you wish to exclude from the range of generated numbers. This value is exclusive.
 */
const getRandomNumberExcludeRange = (
  min: number,
  max: number,
  excludeFloor: number,
  excludeCeiling: number
) => {
  const gapSize = excludeCeiling - excludeFloor;
  const adjustedMax = max - gapSize;
  const number = generateRandomNumberInRange(min, adjustedMax);
  if (number >= excludeFloor && number < excludeCeiling) {
    return number + gapSize + (adjustedMax - excludeCeiling);
  }
  return number;
};

const getRandomCoordinateExcludeRange = (
  min: number,
  max: number,
  excludeFloor: number,
  excludeCeiling: number
) => {
  let x = generateRandomNumberInRange(min, max);
  let y = generateRandomNumberInRange(min, max);
  const numberInRange = (
    number: number,
    rangeStart: number,
    rangeEnd: number
  ) => {
    return number >= rangeStart && number < rangeEnd;
  };

  const xInRange = numberInRange(x, excludeFloor, excludeCeiling);
  const yInRange = numberInRange(y, excludeFloor, excludeCeiling);

  const shiftNumberOutOfRange = (
    n: number,
    min: number,
    max: number,
    excludeFloor: number,
    excludeCeiling: number
  ) => {
    const middleOfExclusionRange =
      excludeFloor + (excludeCeiling - excludeFloor) / 2;
    if (n >= middleOfExclusionRange) {
      return (
        excludeCeiling +
        (generateRandomNumberInRange(excludeCeiling, max) - excludeCeiling)
      );
    } else {
      return excludeFloor - generateRandomNumberInRange(min, excludeFloor);
    }
  };

  if (xInRange && yInRange) {
    if (xInRange) {
      x = shiftNumberOutOfRange(x, min, max, excludeFloor, excludeCeiling);
    }
    if (yInRange) {
      y = shiftNumberOutOfRange(y, min, max, excludeFloor, excludeCeiling);
    }
  }

  return { x: x, y: y };
};

export const Nav: React.FC = () => {
  const starCount = 150;
  const starCoordinates = Array(starCount).fill({
    x: 0,
    y: 0,
  });

  for (let i = 0; i < starCount; i++) {
    starCoordinates[i] = getRandomCoordinateExcludeRange(1, 100, 35, 65);
  }

  return (
    <>
      <defs>
        <radialGradient id="sun">
          <stop offset="0%" stop-color="rgba(208, 124, 80, 1)" />
          <stop offset="100%" stop-color="#f4f812" />
        </radialGradient>
      </defs>
      <Sun
        fill={"url('#sun')"}
        initial={{ x: "50%", r: 50, y: "-100vh" }}
        animate={{ y: 10 }}
        whileHover={{ scale: 1.2 }}
        transition={SUN_TRANSITION}
      />
      {/*
          This is the centermost sunray
          */}
      <motion.path
        d={SUN_RAY_PATH}
        fill="#f4f812"
        initial={{ x: "50%", scale: 0, y: 5, rotate: 0 }}
        animate={{ scale: 1.3 }}
        transition={SUN_RAY_TRANSITION}
        whileHover={{ scale: 20 }}
      />
      <motion.path
        d={SUN_RAY_PATH}
        fill="#f4f812"
        initial={{
          x: `calc(50% - 41.7812px)`,
          scale: 0,
          y: 49.7929 - 60,
          rotate: 40,
        }}
        animate={{ scale: 1.3 }}
        transition={SUN_RAY_TRANSITION}
        whileHover={{ scale: 20 }}
      />
      <motion.path
        d={SUN_RAY_PATH}
        fill="#f4f812"
        initial={{
          x: "calc(50% - 64.0125px)",
          scale: 0,
          y: 11.2871 - 60,
          rotate: 80,
        }}
        animate={{ scale: 1.3 }}
        transition={SUN_RAY_TRANSITION}
        whileHover={{ scale: 20 }}
      />
      <motion.path
        d={SUN_RAY_PATH}
        fill="#f4f812"
        initial={{
          x: "calc(50% + 41.7812px)",
          scale: 0,
          y: 49.7929 - 60,
          rotate: -40,
        }}
        animate={{ scale: 1.3 }}
        transition={SUN_RAY_TRANSITION}
        whileHover={{ scale: 20 }}
      />
      <motion.path
        d={SUN_RAY_PATH}
        fill="#f4f812"
        initial={{
          x: "calc(50% + 64.0125px)",
          scale: 0,
          y: 11.2871 - 60,
          rotate: -80,
        }}
        animate={{ scale: 1.3 }}
        transition={SUN_RAY_TRANSITION}
        whileHover={{ scale: 20 }}
      />
      {starCoordinates.map((coordinate) => {
        return <Star coordinates={coordinate} />;
      })}
    </>
  );
};
