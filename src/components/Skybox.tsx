import styled from "@emotion/styled";
import { motion, Transition } from "motion/react";
import React from "react";
import { SessionContext } from "../pages/Showcase";
import { Star, StarData } from "./Star";

const Sun = styled(motion.circle)``;

const SUN_TRANSITION: Transition = {
  type: "spring",
  duration: 3,
  delay: 2,
  stiffness: 10,
  damping: 5,
  mass: 1,
};

const SUN_RAY_TRANSITION: Transition = {
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

const generateStar = (innerWidth: number, circleDiameter: number): StarData => {
  const scale = Math.random() * (0.8 - 0.2) + 0.2;
  const rotation = Math.random() * 360;
  const delay = Math.random() * 10;
  const duration = Math.random() * 5;

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

  return {
    coordinates: { x: x, y: y },
    scale: scale,
    rotation: rotation,
    delay: delay,
    duration: duration,
    session: false,
  };
};

const generateStars = (count: number): StarData[] => {
  /* We don't want stars in the region of the screen that is too bright.
  We know that the luminosity boundary occurs at (50, 65)% thanks to our gradient.
  The gradient cares about screen height, not width, which means that our gradient is always a perfect circle.
  Thus, we cannot use the parabolic equation y=-(11x^2)/500 + (11x)/5 + 10 on all screen sizes,
  because on narrow screens the circle will fill more horizontal space than on wider screens.
  
  Instead, we must first find the screen's dimensions.
  */
  const { innerWidth, innerHeight } = window;

  // And then the circle's diameter in pixels.

  const circleDiameter = innerHeight * 0.65 * 2;

  const stars = Array.from({ length: count }, () =>
    generateStar(innerWidth, circleDiameter)
  );

  sessionStorage.setItem("stars", JSON.stringify(stars));
  return stars;
};

export const Skybox: React.FC = () => {
  return (
    <SessionContext.Consumer>
      {({ session }) => (
        <>
          <defs>
            <radialGradient id="sun">
              <stop
                offset="0%"
                stop-color="rgba(208, 124, 80, 1)"
              />
              <stop
                offset="100%"
                stop-color="#f4f812"
              />
            </radialGradient>
          </defs>
          <Sun
            fill={"url('#sun')"}
            initial={{ x: "50vw", r: 50, y: session ? 10 : "-100vh" }}
            animate={session ? {} : { y: 10 }}
            whileHover={{ scale: 1.2 }}
            transition={SUN_TRANSITION}
          />
          {/*
          This is the centermost sunray
          */}
          <motion.path
            d={SUN_RAY_PATH}
            fill="#f4f812"
            initial={{ x: "50vw", scale: session ? 1.3 : 0, y: 5, rotate: 0 }}
            animate={session ? {} : { scale: 1.3 }}
            transition={SUN_RAY_TRANSITION}
            whileHover={{ scale: 20 }}
          />
          <motion.path
            d={SUN_RAY_PATH}
            fill="#f4f812"
            initial={{
              x: `calc(50vw - 41.7812px)`,
              scale: session ? 1.3 : 0,
              y: 49.7929 - 60,
              rotate: 40,
            }}
            animate={session ? {} : { scale: 1.3 }}
            transition={SUN_RAY_TRANSITION}
            whileHover={{ scale: 20 }}
          />
          <motion.path
            d={SUN_RAY_PATH}
            fill="#f4f812"
            initial={{
              x: "calc(50vw - 64.0125px)",
              scale: session ? 1.3 : 0,
              y: 11.2871 - 60,
              rotate: 80,
            }}
            animate={session ? {} : { scale: 1.3 }}
            transition={SUN_RAY_TRANSITION}
            whileHover={{ scale: 20 }}
          />
          <motion.path
            d={SUN_RAY_PATH}
            fill="#f4f812"
            initial={{
              x: "calc(50vw + 41.7812px)",
              scale: session ? 1.3 : 0,
              y: 49.7929 - 60,
              rotate: -40,
            }}
            animate={session ? {} : { scale: 1.3 }}
            transition={SUN_RAY_TRANSITION}
            whileHover={{ scale: 20 }}
          />
          <motion.path
            d={SUN_RAY_PATH}
            fill="#f4f812"
            initial={{
              x: "calc(50vw + 64.0125px)",
              scale: session ? 1.3 : 0,
              y: 11.2871 - 60,
              rotate: -80,
            }}
            animate={session ? {} : { scale: 1.3 }}
            transition={SUN_RAY_TRANSITION}
            whileHover={{ scale: 20 }}
          />
          <Stars session={session} />
        </>
      )}
    </SessionContext.Consumer>
  );
};

const Stars: React.FC<{ session: boolean }> = ({ session }) => {
  const starCount = 100;
  const storedStars = sessionStorage.getItem("stars");

  const stars = session
    ? JSON.parse(storedStars ?? "")
    : generateStars(starCount);

  return (
    <>
      {stars.map((star: StarData) => {
        return (
          <Star
            {...star}
            session={session}
          />
        );
      })}
    </>
  );
};
