import { Navbar, ScrollSnapper } from "@yiwmsh/react-carpentry";
import React from "react";
import { Modal } from "../components/Modal";
import { IntrocutionSection } from "./home sections/IntroductionSection.tsx";
import { SplashSection } from "./home sections/SplashSection.tsx";
import { WelcomeModal } from "./home sections/WelcomeModal.tsx";

export const Home: React.FC = () => {
  return (
    <>
      <WelcomeModal />
      <ScrollSnapper>
        <SplashSection />
        <Navbar>Text</Navbar>
        <IntrocutionSection />
      </ScrollSnapper>
    </>
  );
};
