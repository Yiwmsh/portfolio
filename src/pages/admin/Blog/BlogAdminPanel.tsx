import { doc, getDoc } from "firebase/firestore";
import React from "react";
import {
  GetBlogPostsByQuery,
  SortBlogPosts,
} from "../../../components/BlogPostTools";
import { db } from "../../../firebase";
import { Row } from "../../home/home sections/WelcomeModal";
import { BlogPostEditor } from "./BlogPostEditor";
import { BlogPostList } from "./BlogPostList";
import { BlogPostID, BlogPostProps } from "./blogPostProps";


export const BlogAdminPanel: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [postTitles, setPostTitles] = React.useState<BlogPostID[]>([]);
  const [currentPost, setCurrentPost] = React.useState<
    BlogPostProps | undefined
  >(undefined);

  const handleSetCurrentPost = async (uid: string) => {
    if (uid === "") {
      setCurrentPost(undefined);
    } else {
      const response = await getDoc(
        doc(db, process.env.REACT_APP_blogPostCollection ?? "blog-posts", uid)
      );
      setCurrentPost(await (response.data() as BlogPostProps));
    }
  };

  const newPostAdded = (newPost: BlogPostID) => {
    console.log("Post Added");
    setPostTitles((postTitles) => [newPost, ...postTitles]);
  };

  const titleChangeSaved = (uid: string, newTitle: string) => {};

  const getAndSetBlogPosts = async () => {
    const allBlogPosts = await GetBlogPostsByQuery(false, query);
    setPostTitles(
      SortBlogPosts(allBlogPosts, "lastUpdated", "desc").map((post) => {
        return { title: post.title, uid: post.uid };
      })
    );
  };

  React.useEffect(() => {
    getAndSetBlogPosts();
  }, []);

  return (
    <Row>
      <BlogPostList
        postIDs={postTitles}
        setCurrentPost={handleSetCurrentPost}
        searchFieldChanged={setQuery}
        searchButtonClicked={getAndSetBlogPosts}
      />
      <BlogPostEditor
        post={currentPost}
        changesMade={getAndSetBlogPosts}
      />
    </Row>
  );
};
