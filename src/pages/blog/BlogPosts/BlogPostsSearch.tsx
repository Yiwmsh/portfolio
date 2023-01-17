import styled from "@emotion/styled";
import React from "react";
import { BlogPostProps } from "../../admin";

const BlogPostsSearchContainer = styled.div`
  background: black;
  height: 200px;
`;

export const BlogPostsSearch: React.FC<{
  onSearch: (blogPosts: BlogPostProps[]) => void;
}> = ({ onSearch }) => {
  return <BlogPostsSearchContainer></BlogPostsSearchContainer>;
};
