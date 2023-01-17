import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import { LightTheme } from "../../../consts";
import { BlogPostProps } from "../../admin";
import { Navbar } from "../Navbar";
import { BlogPostsSearch } from "./BlogPostsSearch";

export const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = React.useState<BlogPostProps[]>([]);
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <BlogPostsSearch onSearch={() => {}} />
    </ThemeContext>
  );
};
