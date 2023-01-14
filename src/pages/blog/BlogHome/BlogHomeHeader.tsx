import React from "react";
import styled from "@emotion/styled";
import { Color, SemanticColors } from "@chrisellis/react-carpentry";
import portrait from "../../../resources/portrait.jpg";

const aboutBackgroundColor: Color = "#f4edfc";

const HeaderContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
  background-color: ${aboutBackgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 50px;
`;

const BlogHomeTitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

const HeaderPreTitle = styled.p`
  grid-column: 1;
  justify-self: end;
  align-self: end;
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

const BlogHomePreTags = styled.p`
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const BlogHomeBannerTextContainer = styled.div``;

const Tag = styled.div`
  color: var(${SemanticColors.secondary});
`;

const BlogHomeBannerPortrait = styled.img`
  max-height: 30vh;
  margin: 10px 0;
  border-radius: 20px;
`;

const defaultTags: string[] = [
  "stuff",
  "whatever I want",
  "anything",
  "everything",
  "my favourite things",
  "things I like",
];

export const BlogHomeHeader: React.FC<{ tags: (string | undefined)[] }> = ({
  tags,
}) => {
  const allTags = [tags, defaultTags].flat();
  const getRandomArrayIndex = (array: Array<any>): number => {
    return Math.floor(Math.random() * array.length);
  };
  return (
    <HeaderContainer>
      <BlogHomeBannerTextContainer>
        <BlogHomeTitleRow>
          <HeaderPreTitle>Hi there, my name is </HeaderPreTitle>
          <HeaderTitle>Whimsy</HeaderTitle>
        </BlogHomeTitleRow>
        <p>I am a queer, non-binary author, musician, and programmer.</p>
        <BlogHomePreTags>
          This is where I talk about
          <Tag>{allTags[getRandomArrayIndex(allTags)]}</Tag>
        </BlogHomePreTags>
      </BlogHomeBannerTextContainer>
      <BlogHomeBannerPortrait src={portrait} />
    </HeaderContainer>
  );
};
