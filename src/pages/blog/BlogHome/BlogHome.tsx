import React from "react";
import { GetFrontPageBlogPosts } from "../../../components";
import { BlogPostProps } from "../../admin";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePosts } from "./BlogHomePostList";

export const BlogHome: React.FC = () => {
  const [allPosts, setAllPosts] = React.useState<BlogPostProps[]>([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      setAllPosts(await GetFrontPageBlogPosts());
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
