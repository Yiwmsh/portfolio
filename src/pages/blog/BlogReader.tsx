import { useMatch } from "@tanstack/react-location";
import React from "react";
import { BlogPostProps } from "../admin";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { BlogPost } from "./BlogPost";
import styled from "@emotion/styled";

const BlogContainer = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: auto;
`;

export const BlogReader: React.FC = () => {
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
    <>
      {blogPost === undefined ? (
        "No post selected."
      ) : (
        <BlogContainer>
          <BlogPost post={blogPost} />
        </BlogContainer>
      )}
    </>
  );
};
