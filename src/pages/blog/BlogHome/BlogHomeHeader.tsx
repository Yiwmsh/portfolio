import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const HeaderContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
  border-bottom: 1px solid black;
`;

const BlogHomeTitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 96px;
`;

const HeaderPreTitle = styled.p`
  grid-column: 1;
  justify-self: end;
  align-self: end;
`;

const HeaderTitle = styled.h1`
  font-size: 96px;
  grid-column: 2;
  justify-self: center;
  margin: 0;
`;

const BlogHomePreTags = styled.p`
  margin-top: 30px;
  text-align: center;
`;

const defaultTags = ["stuff", "whatever I want", "anything"];

export const BlogHomeHeader: React.FC<{ tags: string[] }> = ({ tags }) => {
  const allTags = [tags, defaultTags].flat();
  const getRandomArrayIndex = (array: Array<any>): number => {
    return Math.floor(Math.random() * array.length);
  };
  return (
    <HeaderContainer>
      <BlogHomeTitleRow>
        <HeaderPreTitle>Hi there, my name is </HeaderPreTitle>
        <HeaderTitle>Whimsy</HeaderTitle>
      </BlogHomeTitleRow>
      <BlogHomePreTags>
        This is where I talk about {allTags[getRandomArrayIndex(allTags)]}
      </BlogHomePreTags>
    </HeaderContainer>
  );
};
