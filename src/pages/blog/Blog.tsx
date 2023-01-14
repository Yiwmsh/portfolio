import { useMatch } from "@tanstack/react-location";
import React from "react";
import { BlogPostProps } from "../admin";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { BlogPost } from "./BlogPost/BlogPost";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme } from "../../consts";
import { Navbar } from "./Navbar";
import { BlogHome } from "./BlogHome/BlogHome";

export const Blog: React.FC = () => {
  const {
    params: { blogSlug },
  } = useMatch();

  const [blogPost, setBlogPost] = React.useState<BlogPostProps | undefined>(
    undefined
  );

  React.useEffect(() => {
    const getPost = async () => {
      const q = query(
        collection(db, "blog-posts"),
        where("slug", "==", blogSlug)
      );
      const response = await getDocs(q);
      const post = await (response.docs[0].data() as BlogPostProps);
      setBlogPost(post);
    };

    getPost();
  }, []);
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      {blogSlug === undefined ? (
        <BlogHome />
      ) : blogPost ? (
        <BlogPost post={blogPost} />
      ) : (
        ""
      )}
    </ThemeContext>
  );
};
