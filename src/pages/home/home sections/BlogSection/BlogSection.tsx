import { SemanticColors, TextContent } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { wherePublished } from "../../../../components/BlogPostTools";
import { CenteringSection } from "../../../../components/CenteringSection";
import { ScrollButton } from "../../../../components/ScrollButton";
import { db } from "../../../../firebase";
import { BlogPostProps } from "../../../admin/Blog/blogPostProps";
import { BlogPostBigPreview } from "./BlogPostPreviewBig";
import { BlogPostPreviewList } from "./BlogPostPreviewList";

export const StyledLink = styled.a`
  &:link,
  &:visited {
    color: var(${SemanticColors.secondary});
    text-decoration: none;
  }
`;

const ScreenWidthBreakPoint = 1000;

const BlogGrid = styled.div`
  display: grid;
  height: 60vh;
  width: 80vw;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 2fr;
  column-gap: 5px;
  row-gap: 5px;

  @media screen and (max-width: ${ScreenWidthBreakPoint}px) {
    grid-template-columns: 1fr;
  }
`;

const BlogDescription = styled.div`
  grid-column: 1;
  grid-row: 1;
  padding: 10px;
  background-color: var(${SemanticColors.foreground});
  border-radius: 0.375em;
`;

const BlogDescriptionHeader = styled.h3`
  text-align: center;
`;

const BlogDescriptionBody = styled.div``;

const LatestPost = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  background-color: var(${SemanticColors.foreground});
  border-radius: 0.375em;
  overflow: hidden;

  @media screen and (max-width: ${ScreenWidthBreakPoint}px) {
    display: none;
  }
`;

const MorePosts = styled.div`
  grid-column: 1;
  grid-row: 2;
  background-color: var(${SemanticColors.foreground});
  border-radius: 0.375em;

  @media screen and (max-width: ${ScreenWidthBreakPoint}px) {
    display: none;
  }
`;

const SmallScreenPostList = styled.div`
  grid-column: 1;
  grid-row: 2;
  background-color: var(${SemanticColors.foreground});
  border-radius: 0.375em;

  @media screen and (min-width: ${ScreenWidthBreakPoint}px) {
    display: none;
  }
`;

const BlogBlurbExtra = styled.p`
  @media screen and (max-width: ${ScreenWidthBreakPoint}px) {
    display: none;
  }

  @media screen and (max-height: 1000px) {
    display: none;
  }
`;

export const BlogSection: React.FC = () => {
  const [recentPosts, setRecentPosts] = React.useState<BlogPostProps[]>([]);

  React.useEffect(() => {
    const getRecentPosts = async () => {
      const q = query(
        collection(
          db,
          process.env.REACT_APP_blogPostCollection ?? "blog-posts"
        ),
        wherePublished,
        where("publishedDate", "!=", "null"),
        orderBy("publishedDate", "desc"),
        limit(6)
      );

      const response = await getDocs(q);
      let docs: BlogPostProps[] = [];
      response.forEach((doc) => {
        try {
          docs.push(doc.data() as BlogPostProps);
        } catch (e) {
          console.log(e);
        }
      });
      setRecentPosts(docs);
    };

    getRecentPosts();
  }, []);
  return (
    <CenteringSection id="Blog">
      <ScrollButton
        direction="up"
        target="Music"
      />
      <BlogGrid>
        <BlogDescription>
          <TextContent>
            <BlogDescriptionHeader>
              Hi! Welcome to my blog.
            </BlogDescriptionHeader>
            <BlogDescriptionBody>
              <p>
                Or, at least, a preview of it. The full thing, with search
                features and more breathing room for all my little words, can be
                found <StyledLink href="/blog">here</StyledLink>.
              </p>
              <BlogBlurbExtra>
                I like to write about my interests; from music, to writing, to
                coding, and more!. I even occasionally try my hand at
                philosophy. And, of course, sometimes I just want to share my
                thoughts.
              </BlogBlurbExtra>
            </BlogDescriptionBody>
          </TextContent>
        </BlogDescription>
        <LatestPost>
          <BlogPostBigPreview post={recentPosts[0]} />
        </LatestPost>
        <MorePosts>
          <BlogPostPreviewList posts={recentPosts.slice(1)} />
        </MorePosts>
        <SmallScreenPostList>
          <BlogPostPreviewList posts={recentPosts} />
        </SmallScreenPostList>
      </BlogGrid>
      {/* <ScrollButton direction="down" target="" /> */}
    </CenteringSection>
  );
};
