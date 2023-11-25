import { Button, Navbar } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { Skybox } from "../components/Skybox";
import { WelcomeModal } from "./home/home sections/WelcomeModal";

export const NameContext = React.createContext({
  name: localStorage.getItem("name") ?? "Friend",
  setName: (value: string) => {},
});

export const SessionContext = React.createContext({
  session: sessionStorage.getItem("stars") ? true : false,
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

export const Site: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          <SessionContext.Consumer>
            {({ session }) => (
              <>
                <BackgroundAnimation
                  initial={{ top: session ? 0 : "-100vh" }}
                  animate={{ top: 0 }}
                  transition={BACKGROUND_TRANSITION}
                />
                <SVGCanvas>
                  <Skybox />
                </SVGCanvas>
                {children}
              </>
            )}
          </SessionContext.Consumer>
        )}
      </NameContext.Provider>
    </>
  );
};
