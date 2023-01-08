import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const HeaderContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / span 3;
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

const BlogHomeTagsBanner = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: horizontal;
  overflow-x: hidden;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100vw;
  height: 2em;
  text-align: center;
`;

const Tag = styled.p``;

export const BlogHomeHeader: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <HeaderContainer>
      <BlogHomeTitleRow>
        <HeaderPreTitle>Hi there, my name is </HeaderPreTitle>
        <HeaderTitle>Whimsy</HeaderTitle>
      </BlogHomeTitleRow>
      <BlogHomePreTags>This is where I talk about</BlogHomePreTags>
      <BlogHomeTagsBanner>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
        <Tag>Tag</Tag>
      </BlogHomeTagsBanner>
    </HeaderContainer>
  );
};
