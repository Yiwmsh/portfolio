import styled from "@emotion/styled";
import { Button, Navbar, ScrollSnapper } from "@yiwmsh/react-carpentry";
import React from "react";
import { Modal } from "../components/Modal";
import { IntrocutionSection } from "./home sections/IntroductionSection";
import { SplashSection } from "./home sections/SplashSection";
import { WelcomeModal } from "./home sections/WelcomeModal";
import { YoutubeSection } from "./home sections/YoutubeSection";
import { motion } from "framer-motion";

export const NameContext = React.createContext({
  name: localStorage.getItem("name") ?? "Friend",
  setName: (value: string) => {},
});

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  z-index: -2;
  width: 100%;
  height: 200%;
  background: radial-gradient(
    circle at center top,
    rgba(246, 217, 89, 1) 0%,
    rgba(208, 124, 80, 1) 10%,
    rgba(100, 60, 86, 1) 22.5%,
    rgba(39, 36, 57, 1) 32.5%,
    rgba(13, 15, 30, 1) 50%
  );
`;

export const Home: React.FC = () => {
  const [name, setName] = React.useState(
    localStorage.getItem("name") ?? "Friend"
  );

  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = `linear-gradient(
    rgba(39, 36, 57, 1) 0%,
    rgba(13, 15, 30, 1) 10%
  )`;

  const Canvas = styled(motion.svg)`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  `;

  const BACKGROUND_TRANSITION = { duration: 5 };

  const SUN_TRANSITION = {
    type: "spring",
    duration: 3,
    delay: 2,
    stiffness: 10,
    damping: 5,
    mass: 1,
  };

  const SUN_RAY_TRANSITION = {
    type: "spring",
    duration: 3,
    delay: 2,
    stiffness: 10,
    damping: 5,
    mass: 1,
  };

  const SUN_RAY_ANIMATION = {};

  return (
    <>
      <BackgroundAnimation
        initial={{ top: "-100vh" }}
        animate={{ top: 0 }}
        transition={BACKGROUND_TRANSITION}
      />
      <Canvas>
        <defs>
          <radialGradient id="sun">
            <stop offset="0%" stop-color="rgba(208, 124, 80, 1)" />
            <stop offset="100%" stop-color="#f4f812" />
          </radialGradient>
        </defs>
        <motion.circle
          fill={"url('#sun')"}
          initial={{ x: "50%", r: 50, y: "-100vh" }}
          animate={{ y: 10 }}
          transition={SUN_TRANSITION}
        />
        <motion.path
          d="M 3 5 L 5 7 L 5 4 Q 4 5 3 5"
          fill="#f4f812"
          initial={{ x: "45.5%", scale: 15, y: "-100vh", rotate: 98 }}
          animate={{ y: 15 }}
          transition={SUN_RAY_TRANSITION}
          whileHover={{ scale: 20 }}
        />
        <motion.path
          d="M 3 5 L 5 7 L 5 4 Q 4 5 3 5"
          fill="#f4f812"
          initial={{ x: "46.8%", scale: 15, y: "-100vh", rotate: 70 }}
          animate={{ y: 56 }}
          transition={SUN_RAY_TRANSITION}
          whileHover={{ scale: 20 }}
        />
        <motion.path
          d="M 3 5 L 5 7 L 5 4 Q 4 5 3 5"
          fill="#f4f812"
          initial={{ x: "49.5%", scale: 15, y: "-100vh", rotate: 25 }}
          animate={{ y: 75 }}
          transition={SUN_RAY_TRANSITION}
          whileHover={{ scale: 20 }}
        />
        <motion.path
          d="M 3 5 L 5 7 L 5 4 Q 4 5 3 5"
          fill="#f4f812"
          initial={{ x: "52.2%", scale: 15, y: "-100vh", rotate: -15 }}
          animate={{ y: 60 }}
          transition={SUN_RAY_TRANSITION}
          whileHover={{ scale: 20 }}
        />
        <motion.path
          d="M 3 5 L 5 7 L 5 4 Q 4 5 3 5"
          fill="#f4f812"
          initial={{ x: "53.8%", scale: 15, y: "-100vh", rotate: -44 }}
          animate={{ y: 26 }}
          transition={SUN_RAY_TRANSITION}
          whileHover={{ scale: 20 }}
        />
      </Canvas>

      <NameContext.Provider value={{ name, setName }}>
        <WelcomeModal />
        <ScrollSnapper>
          <SplashSection />
          <IntrocutionSection />
          {/* <StickyNav>
            <Button onPress={() => localStorage.clear()}>
              Clear Local Storage (dev)
            </Button>
          </StickyNav> */}
          <YoutubeSection />
          <IntrocutionSection />
        </ScrollSnapper>
      </NameContext.Provider>
    </>
  );
};
