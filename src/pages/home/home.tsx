import { ScrollSnapper } from "@chrisellis/react-carpentry";
import React from "react";
import { BioSection } from "./home sections/BioSection";
import { BlogSection } from "./home sections/BlogSection/BlogSection";
import { MusicSection } from "./home sections/MusicSection";
import { SplashSection } from "./home sections/SplashSection";

export const Home: React.FC = () => {
  return (
    <ScrollSnapper hideOverflow>
      <SplashSection />
      <BioSection />
      <MusicSection />
      <BlogSection />
    </ScrollSnapper>
  );
};
