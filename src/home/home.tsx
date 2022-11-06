import { ScrollSnapper } from "@yiwmsh/react-carpentry";
import React from "react";
import { GreetingSection } from "./home sections/GreetingSection.tsx";
import { IntrocutionSection } from "./home sections/IntroductionSection.tsx";

export const Home: React.FC = () => {
  return (
    <ScrollSnapper>
      <GreetingSection />
      <IntrocutionSection />
    </ScrollSnapper>
  );
};
