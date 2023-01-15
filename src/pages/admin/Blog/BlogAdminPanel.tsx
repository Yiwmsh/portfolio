import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase";
import { BlogPostList } from "./BlogPostList";
import { BlogPostEditor } from "./BlogPostEditor";
import { Row } from "../../home/home sections/WelcomeModal";
import { BlogPostID, BlogPostProps } from "./blogPostProps";
import {
  GetBlogPostsByQuery,
  SortBlogPosts,
} from "../../../components/BlogPostTools";

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
      const response = await getDoc(doc(db, "blog-posts", uid));
      setCurrentPost(await (response.data() as BlogPostProps));
    }
  };

  const newPostAdded = (newPost: BlogPostID) => {
    console.log("Post Added");
    setPostTitles((postTitles) => [newPost, ...postTitles]);
  };

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
        newPost={newPostAdded}
        postDeleted={getAndSetBlogPosts}
      />
    </Row>
  );
};
