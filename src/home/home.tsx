import styled from "@emotion/styled";
import { Button, Navbar, ScrollSnapper } from "@yiwmsh/react-carpentry";
import React from "react";
import { Modal } from "../components/Modal";
import { IntrocutionSection } from "./home sections/IntroductionSection";
import { WelcomeModal } from "./home sections/WelcomeModal";
import { YoutubeSection } from "./home sections/YoutubeSection";

export const NameContext = React.createContext({
  name: localStorage.getItem("name") ?? "Friend",
  setName: (value: string) => {},
});

const StickyNav = styled(Navbar)`
  bottom: 0px;
`;

export const Home: React.FC = () => {
  const [name, setName] = React.useState(
    localStorage.getItem("name") ?? "Friend"
  );

  return (
    <>
      <NameContext.Provider value={{ name, setName }}>
        <WelcomeModal />
        <ScrollSnapper>
          <IntrocutionSection />
          <StickyNav>
            <Button onPress={() => localStorage.clear()}>
              Clear Local Storage (dev)
            </Button>
          </StickyNav>
          <YoutubeSection />
          <IntrocutionSection />
        </ScrollSnapper>
      </NameContext.Provider>
    </>
  );
};
