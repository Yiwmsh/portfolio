import { doc, getDoc } from "firebase/firestore";
import React from "react";
import {
  GetAllBlogPostsCount,
  GetFrontPageBlogPosts,
  blogPosts,
} from "../../../components";
import { BlogPostProps } from "../../admin";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePosts } from "./BlogHomePostList";

export const BlogHome: React.FC = () => {
  const [frontPagePosts, setFrontPagePosts] = React.useState<BlogPostProps[]>(
    []
  );
  const [allPostsCount, setAllPostsCount] = React.useState<number>();
  React.useEffect(() => {
    const fetchPosts = async () => {
      setFrontPagePosts(await GetFrontPageBlogPosts());
      setAllPostsCount(await GetAllBlogPostsCount(true));
    };
    fetchPosts();
  }, []);

  const loadNextPage = async () => {
    const nextPage = await GetFrontPageBlogPosts(
      15,
      await getDoc(
        doc(blogPosts, frontPagePosts[frontPagePosts.length - 1].uid)
      )
    );
    setFrontPagePosts([...frontPagePosts, ...nextPage]);
  };

  const tags = frontPagePosts
    .map((post) => post.tags)
    .flat()
    .filter((tag) => {
      return tag !== undefined;
    });
  return (
    <>
      <BlogHomeHeader tags={tags} />
      <BlogHomePosts
        loadNextPage={loadNextPage}
        posts={frontPagePosts}
        maxPosts={allPostsCount}
      />
    </>
  );
};
