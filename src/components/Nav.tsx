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
  delay: 4.5,
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

const generateIndividualStarCoordiante = (
  innerWidth: number,
  circleDiameter: number
) => {
  /* Now we can calculate the horizon's arc by assuming our circle's origin is at (50, 0)%,
  And it has a point at (50, 65)%. Our circle's equation is (x - 50)^2 + y^2 = 4225.
  Solving for y gives us y = ± sqrt(-x^2 + 100 x + 1725), but we only care about positive y values,
  Thus y = sqrt(-x^2 + 100 x + 1725).
  */
  const x = generateRandomNumberInRange(0, 100);
  const xPixel = innerWidth * (x / 100);
  const gapOnEitherSide = (innerWidth - circleDiameter) / 2;
  const circleXPercent = ((xPixel - gapOnEitherSide) / circleDiameter) * 100;
  const yFloor =
    circleXPercent <= 0 || circleXPercent >= 100
      ? 0
      : Math.sqrt(-Math.pow(x, 2) + 100 * x + 1725);
  const y = generateRandomNumberInRange(yFloor, 100);
  return { x: x, y: y };
};

const generateStarCoordinates = (count: number) => {
  /* We don't want stars in the region of the screen that is too bright.
  We know that the luminosity boundary occurs at (50, 65)% thanks to our gradient.
  The gradient cares about screen height, not width, which means that our gradient is always a perfect circle.
  Thus, we cannot use the parabolic equation y=-(11x^2)/500 + (11x)/5 + 10 on all screen sizes,
  because on narrow screens the circle will fill more horizontal space than on wider screens.
  
  Instead, we must first find the screen's dimensions.
  */
  const { innerWidth, innerHeight } = window;

  // And then the circle's diameter in pixles.

  const circleDiameter = innerHeight * 0.65 * 2;

  const starCoords = Array.from({ length: count }, () =>
    generateIndividualStarCoordiante(innerWidth, circleDiameter)
  );

  return starCoords;
};

export const Nav: React.FC = () => {
  const starCount = 100;

  const starCoordinates = generateStarCoordinates(starCount);

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
