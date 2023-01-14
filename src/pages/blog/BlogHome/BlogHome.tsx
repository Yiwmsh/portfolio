import React from "react";
import styled from "@emotion/styled";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePosts } from "./BlogHomePostList";
import { GetAllPublishedBlogPosts } from "../../../components";
import { BlogPostProps } from "../../admin";

export const BlogHome: React.FC = () => {
  const [allPosts, setAllPosts] = React.useState<BlogPostProps[]>([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      setAllPosts(await GetAllPublishedBlogPosts());
    };
    fetchPosts();
  }, []);
  return (
    <>
      <BlogHomeHeader tags={[]} />
      <BlogHomePosts allPosts={allPosts} />
    </>
  );
};
