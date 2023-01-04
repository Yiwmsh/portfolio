import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase";
import { BlogPostList } from "./BlogPostList";
import { BlogPostEditor } from "./BlogPostEditor";
import { Row } from "../../home/home sections/WelcomeModal";
import { BlogPostProps } from "./blogPost";

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
      console.log(response.data());
      setCurrentPost(await (response.data() as BlogPostProps));
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      let allTitles = [""];
      const response = await getDocs(collection(db, "blog-posts"));
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
