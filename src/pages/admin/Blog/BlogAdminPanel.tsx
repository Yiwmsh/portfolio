import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase";
import { BlogPostList } from "./BlogPostList";
import { BlogPostEditor } from "./BlogPostEditor";
import { Row } from "../../home/home sections/WelcomeModal";
import { BlogPostProps } from "./blogPostProps";
import {
  GetBlogPostsByQuery,
  SortBlogPosts,
} from "../../../components/BlogPostTools";

export const BlogAdminPanel: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [postTitles, setPostTitles] = React.useState([""]);
  const [currentPost, setCurrentPost] = React.useState<
    BlogPostProps | undefined
  >(undefined);

  const handleSetCurrentPost = async (title: string) => {
    if (title === "") {
      setCurrentPost(undefined);
    } else {
      const response = await getDoc(doc(db, "blog-posts", title));
      setCurrentPost(await (response.data() as BlogPostProps));
    }
  };

  const getAndSetBlogPosts = async () => {
    console.log(`Query: ${query}`);
    const allBlogPosts = await GetBlogPostsByQuery(query);
    setPostTitles(
      SortBlogPosts(allBlogPosts, "lastUpdated", "desc").map(
        (post) => post.title
      )
    );
  };

  React.useEffect(() => {
    getAndSetBlogPosts();
  }, []);

  return (
    <Row>
      <BlogPostList
        postTitles={postTitles}
        setCurrentPost={handleSetCurrentPost}
        searchFieldChanged={setQuery}
        searchButtonClicked={getAndSetBlogPosts}
      />
      <BlogPostEditor post={currentPost} />
    </Row>
  );
};
