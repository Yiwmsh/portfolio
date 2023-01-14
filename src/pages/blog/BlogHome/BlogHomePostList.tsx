import React from "react";
import styled from "@emotion/styled";
import { BlogPostProps } from "../../admin";
import { BlogPostList } from "../BlogPostList";

export const PostListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 50px;
  column-gap: 20px;
  margin: 60px 10vw 0;
`;

export const BlogHomePosts: React.FC<{ allPosts: BlogPostProps[] }> = ({
  allPosts,
}) => {
  return (
    <PostListGrid>
      <BlogPostList posts={allPosts} />
    </PostListGrid>
  );
};
