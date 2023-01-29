import { ThemeContext } from "@chrisellis/react-carpentry";
import React from "react";
import { GetRecentPublishedBlogPosts } from "../../../components";
import { LightTheme } from "../../../consts";
import { BlogPostProps } from "../../admin";
import { BlogPostList } from "../BlogPostList";
import { Navbar } from "../Navbar";
import { BlogPostsSearch } from "./BlogPostsSearch";

export const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = React.useState<BlogPostProps[]>([]);

  React.useEffect(() => {
    const getBlogPosts = async () => {
      setBlogPosts(await GetRecentPublishedBlogPosts());
    };

    getBlogPosts();
  }, []);
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      <BlogPostsSearch onSearch={() => {}} />
      <BlogPostList
        posts={blogPosts}
        loadNextPage={() => {}}
      />
    </ThemeContext>
  );
};
