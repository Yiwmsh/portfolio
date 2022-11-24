import styled from "@emotion/styled";
import { Button, Navbar, ScrollSnapper } from "@yiwmsh/react-carpentry";
import React from "react";
import { Modal } from "../components/Modal";
import { IntrocutionSection } from "./home sections/IntroductionSection";
import { SplashSection } from "./home sections/SplashSection";
import { WelcomeModal } from "./home sections/WelcomeModal";
import { YoutubeSection } from "./home sections/YoutubeSection";
import { motion } from "framer-motion";
import { Nav } from "../components/Nav";

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

  const SVGCanvas = styled(motion.svg)`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `;

  const BACKGROUND_TRANSITION = { duration: 5 };

  return (
    <>
      <BackgroundAnimation
        initial={{ top: "-100vh" }}
        animate={{ top: 0 }}
        transition={BACKGROUND_TRANSITION}
      />
      <NameContext.Provider value={{ name, setName }}>
        <WelcomeModal />
        <SVGCanvas>
          <Nav />
        </SVGCanvas>
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
