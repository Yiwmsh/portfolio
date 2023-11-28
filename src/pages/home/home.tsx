import { ScrollSnapper } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { CenteringSection } from "../../components/CenteringSection";
import { ScrollButton } from "../../components/ScrollButton";
import { BioSection } from "./home sections/BioSection";
import { BlogSection } from "./home sections/BlogSection/BlogSection";
import { MusicSection } from "./home sections/MusicSection";
import { SplashSection } from "./home sections/SplashSection";

const HomeSection = styled.div`
  height: 80%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const sections: { section: JSX.Element; id: string }[] = [
  { section: <SplashSection />, id: "Splash" },
  { section: <BioSection />, id: "Bio" },
  { section: <MusicSection />, id: "Music" },
  { section: <BlogSection />, id: "Blog" },
];

export const Home: React.FC = () => {
  return (
    <ScrollSnapper hideOverflow>
      {sections.map((section, index) => (
        <CenteringSection id={section.id}>
          <HomeSection>
            {index > 0 ? (
              <ScrollButton
                direction="up"
                target={sections[index - 1].id}
              />
            ) : (
              <div aria-hidden />
            )}
            {section.section}
            {index < sections.length - 1 ? (
              <ScrollButton
                direction="down"
                target={sections[index + 1].id}
              />
            ) : (
              <div aria-hidden />
            )}
          </HomeSection>
        </CenteringSection>
      ))}
    </ScrollSnapper>
  );
};
