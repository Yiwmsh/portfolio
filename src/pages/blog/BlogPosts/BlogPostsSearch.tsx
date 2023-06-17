import styled from "@emotion/styled";
import React from "react";
import { useSearchParams } from "react-router-dom";

const BlogPostsSearchContainer = styled.div`
  background: black;
  height: 200px;
`;

export const BlogPostsSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  return <BlogPostsSearchContainer></BlogPostsSearchContainer>;
};
