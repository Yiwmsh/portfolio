import styled from "@emotion/styled";
import { Button, Navbar, ScrollSnapper } from "@chrisellis/react-carpentry";
import React from "react";
import { BioSection } from "./home sections/BioSection";
import { motion } from "framer-motion";
import { Nav } from "../../components/Nav";
import { WelcomeModal } from "./home sections/WelcomeModal";
import { SplashSection } from "./home sections/SplashSection";
import { MusicSection } from "./home sections/MusicSection";

export const NameContext = React.createContext({
  name: localStorage.getItem("name") ?? "Friend",
  setName: (value: string) => {},
});

const StickyNav = styled(Navbar)`
  bottom: 0;
`;

const BackgroundAnimation = styled(motion.div)`
  position: absolute;
  z-index: -3;
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
    z-index: -1;
  `;

  const BACKGROUND_TRANSITION = { duration: 5 };
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(
    !localStorage.getItem("name")
  );

  const DoneButton = styled(Button)`
    margin-top: 5px;
    width: 50%;
  `;

  const closeModalButton = (
    <DoneButton onPress={() => setWelcomeModalOpen(false)}>Submit</DoneButton>
  );

  return (
    <>
      <NameContext.Provider value={{ name, setName }}>
        <WelcomeModal
          closeButton={closeModalButton}
          welcomeModalOpen={welcomeModalOpen}
        />
        {!welcomeModalOpen && (
          <>
            <BackgroundAnimation
              initial={{ top: "-100vh" }}
              animate={{ top: 0 }}
              transition={BACKGROUND_TRANSITION}
            />
            <SVGCanvas>
              <Nav />
            </SVGCanvas>
            <ScrollSnapper hideOverflow>
              <SplashSection />
              <BioSection />
              {/* <StickyNav>
                <Button onPress={() => localStorage.clear()}>
                  Clear Local Storage (dev)
                </Button>
              </StickyNav> */}
              <MusicSection />
            </ScrollSnapper>
          </>
        )}
      </NameContext.Provider>
    </>
  );
};
