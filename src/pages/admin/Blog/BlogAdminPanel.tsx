import {
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase";
import { BlogPostList } from "./BlogPostList";
import { BlogPostEditor } from "./BlogPostEditor";
import { Row } from "../../home/home sections/WelcomeModal";
import { BlogPostProps } from "./blogPostProps";

export const BlogAdminPanel: React.FC = () => {
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

  React.useEffect(() => {
    const fetchData = async () => {
      let allTitles = [""];
      const blogPosts = collection(db, "blog-posts");
      const q = query(
        blogPosts,
        where("lastUpdated", "!=", ""),
        orderBy("lastUpdated", "desc")
      );
      const response = await getDocs(q);
      response.forEach((doc) => {
        allTitles.push(doc.data().title);
      });
      setPostTitles(allTitles);
    };

    fetchData();
  }, []);

  return (
    <Row>
      <BlogPostList
        postTitles={postTitles}
        setCurrentPost={handleSetCurrentPost}
      />
      <BlogPostEditor post={currentPost} />
    </Row>
  );
};
