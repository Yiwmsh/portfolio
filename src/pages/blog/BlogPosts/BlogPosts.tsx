import React from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme } from "../../../consts";
import { Navbar } from "../Navbar";
import { BlogPostsSearch } from "./BlogPostsSearch";
import { BlogPostProps } from "../../admin";

export const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = React.useState<BlogPostProps[]>([]);
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <BlogPostsSearch onSearch={() => {}} />
    </ThemeContext>
  );
};
