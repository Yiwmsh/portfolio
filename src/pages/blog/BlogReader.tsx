import { useMatch } from "@tanstack/react-location";
import React from "react";
import { BlogPostProps } from "../admin";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BlogPost } from "./BlogPost";

export const BlogReader: React.FC = () => {
  const {
    params: { blogTitle },
  } = useMatch();

  const [blogPost, setBlogPost] = React.useState<BlogPostProps | undefined>(
    undefined
  );

  React.useEffect(() => {
    const getPost = async () => {
      const response = await getDoc(doc(db, "blog-posts", blogTitle));
      const post = await (response.data() as BlogPostProps);
      setBlogPost(post);
    };

    getPost();
  }, []);
  return (
    <>
      {blogPost === undefined ? (
        "No post selected."
      ) : (
        <BlogPost post={blogPost} />
      )}
    </>
  );
};
