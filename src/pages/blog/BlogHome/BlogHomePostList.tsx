import styled from "@emotion/styled";
import React from "react";
import { BlogPostProps } from "../../admin/Blog/blogPostProps";
import { BlogPostList } from "../BlogPostList";

const ScreenWidthBreakpoints = {
  twoRows: 830,
  oneRow: 600,
};

const PostListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  row-gap: 50px;
  column-gap: 20px;
  margin: 60px 10vw 0;

  @media screen and (max-width: ${ScreenWidthBreakpoints.twoRows}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${ScreenWidthBreakpoints.oneRow}px) {
    grid-template-columns: 1fr;
  }
`;

const NothingHereYet = styled.div`
  margin: auto;
  grid-column: 2;
  padding: 50px;
`;

export const BlogHomePosts: React.FC<{
  posts: BlogPostProps[];
  maxPosts?: number;
  loadNextPage: () => {};
}> = ({ posts, maxPosts, loadNextPage }) => {
  return (
    <PostListGrid>
      {posts.length > 0 ? (
        <BlogPostList
          posts={posts}
          maxPosts={maxPosts}
          loadNextPage={loadNextPage}
        />
      ) : (
        <NothingHereYet>
          It looks like there's nothing here yet - check back later!
        </NothingHereYet>
      )}
    </PostListGrid>
  );
};
