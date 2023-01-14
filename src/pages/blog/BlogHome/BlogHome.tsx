import React from "react";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePosts } from "./BlogHomePostList";
import { GetRecentPublishedBlogPosts } from "../../../components";
import { BlogPostProps } from "../../admin";

export const BlogHome: React.FC = () => {
  const [allPosts, setAllPosts] = React.useState<BlogPostProps[]>([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      setAllPosts(await GetRecentPublishedBlogPosts());
    };
    fetchPosts();
  }, []);

  const tags = allPosts
    .map((post) => post.tags)
    .flat()
    .filter((tag) => {
      return tag !== undefined;
    });
  return (
    <>
      <BlogHomeHeader tags={tags} />
      <BlogHomePosts allPosts={allPosts} />
    </>
  );
};