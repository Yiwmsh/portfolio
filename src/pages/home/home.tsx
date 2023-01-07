import { ScrollSnapper } from "@chrisellis/react-carpentry";
import React from "react";
import { BioSection } from "./home sections/BioSection";
import { SplashSection } from "./home sections/SplashSection";
import { MusicSection } from "./home sections/MusicSection";
import { BlogSection } from "./home sections/BlogSection/BlogSection";

export const Home: React.FC = () => {
  return (
    <ScrollSnapper hideOverflow>
      <SplashSection />
      <BioSection />
      {/* <StickyNav>
                <Button onPress={() => localStorage.clear()}>
                  Clear Local Storage (dev)
                </Button>
              </StickyNav> */}
      <MusicSection />
      <BlogSection />
    </ScrollSnapper>
  );
};
