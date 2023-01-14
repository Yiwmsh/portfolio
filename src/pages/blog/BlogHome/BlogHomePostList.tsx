import React from "react";
import styled from "@emotion/styled";
import { BlogPostProps } from "../../admin";
import { BlogPostList } from "../BlogPostList";

const PostListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 50px;
  column-gap: 20px;
  margin: 60px 10vw 0;
`;

const NothingHereYet = styled.div`
  margin: auto;
  grid-column: 2;
  padding: 50px;
`;

export const BlogHomePosts: React.FC<{ allPosts: BlogPostProps[] }> = ({
  allPosts,
}) => {
  return (
    <PostListGrid>
      {allPosts.length > 0 ? (
        <BlogPostList posts={allPosts} />
      ) : (
        <NothingHereYet>
          It looks like there's nothing here yet - check back later!
        </NothingHereYet>
      )}
    </PostListGrid>
  );
};
