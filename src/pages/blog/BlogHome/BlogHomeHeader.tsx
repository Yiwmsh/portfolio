import { Color, SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import portrait from "../../../resources/portrait.jpg";

const aboutBackgroundColor: Color = "#f4edfc";
const TitleRowMinWidth = 353;

const ScreenWidthBreakPoints = {
  TitleRow: 1029,
  Banner: 850,
  BioBlurb: 405,
};

const HeaderContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
  background-color: ${aboutBackgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 clamp(5px, calc(100vw - ${TitleRowMinWidth}), 50px);
`;

const BlogHomeTitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;

  @media screen and (max-width: ${ScreenWidthBreakPoints.TitleRow}px) {
    grid-template-columns: auto;
  }

  @media screen and (min-width: ${TitleRowMinWidth - 1}px) {
    min-width: ${TitleRowMinWidth}px;
  }

  @media screen and (max-width: ${TitleRowMinWidth}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderPreTitle = styled.p`
  grid-column: 1;
  justify-self: end;
  align-self: end;

  @media screen and (max-width: ${TitleRowMinWidth}px) {
    align-self: center;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 60px;
  line-height: 60px;
  grid-column: 2;
  justify-self: center;
  margin: 0;
  background: linear-gradient(
    60deg,
    rgba(246, 217, 89, 1),
    rgba(208, 124, 80, 1),
    rgba(100, 60, 86, 1),
    rgba(39, 36, 57, 1)
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BlogHomePreTag = styled.p`
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 4px;

  @media screen and (max-width: ${ScreenWidthBreakPoints.BioBlurb}px) {
    margin: 0 auto;
  }
`;

const BlogHomeBannerTextContainer = styled.div`
  @media screen and (max-width: ${ScreenWidthBreakPoints.Banner}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Tag = styled.div`
  color: var(${SemanticColors.secondary});
`;

const BlogHomeBannerPortrait = styled.img`
  max-height: 30vh;
  margin: 10px 0;
  border-radius: 10px;

  @media screen and (max-width: 787px) {
    max-width: calc(100vw - ${TitleRowMinWidth}px - 100px);
  }

  @media screen and (max-width: ${ScreenWidthBreakPoints.Banner}px) {
    display: none;
  }
`;

const SmallScreenBlogHomeBannerPortrait = styled.img`
  border-radius: 10px;
  max-height: 30vh;
  max-width: 90vw;
  margin: 0 auto;

  @media screen and (min-width: ${ScreenWidthBreakPoints.Banner - 1}px) {
    display: none;
  }
`;

const BioBlurb = styled.p`
  @media screen and (max-width: ${ScreenWidthBreakPoints.BioBlurb}px) {
    margin-left: 5px;
    margin-right: 5px;
    text-align: center;
  }
`;

const defaultTags: string[] = [
  "stuff",
  "whatever I want",
  "my favourite things",
  "things I like",
];

export const BlogHomeHeader: React.FC<{ tags: string[] }> = ({ tags }) => {
  const allTags = [tags, defaultTags].flat();
  const getRandomArrayIndex = (array: Array<any>): number => {
    return Math.floor(Math.random() * array.length);
  };
  const getNewRandomTag = (previousTag: string) => {
    return allTags[
      getRandomArrayIndex(allTags.filter((tag) => tag !== previousTag))
    ];
  };
  const [displayTag, setDisplayTag] = React.useState(getNewRandomTag(""));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTag(getNewRandomTag(displayTag));
      console.log("Tag changed");
    }, 5000);

    return () => {
      clearInterval(interval);
      console.log("Interval cleared");
    };
  }, []);

  return (
    <HeaderContainer>
      <BlogHomeBannerTextContainer>
        <BlogHomeTitleRow>
          <HeaderPreTitle>Hi there, my name is </HeaderPreTitle>
          <HeaderTitle>Whimsy</HeaderTitle>
        </BlogHomeTitleRow>
        <SmallScreenBlogHomeBannerPortrait src={portrait} />
        <BioBlurb>
          I am a queer, non-binary author, musician, and programmer.
        </BioBlurb>
        <BlogHomePreTag>
          This is where I talk about
          <Tag>{displayTag}</Tag>
        </BlogHomePreTag>
      </BlogHomeBannerTextContainer>
      <BlogHomeBannerPortrait src={portrait} />
    </HeaderContainer>
  );
};
