import { useMatch } from "@tanstack/react-location";
import React from "react";
import { BlogPostProps } from "../admin";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { BlogPost } from "./BlogPost/BlogPost";
import styled from "@emotion/styled";
import { BlogHomeHeader } from "./BlogHome/BlogHomeHeader";
import { ThemeContext } from "@chrisellis/react-carpentry";
import { LightTheme } from "../../consts";
import { BlogNavbar } from "./BlogNavbar";
import { BlogHomePosts } from "./BlogHome/BlogHomePostList";
import { BlogHome } from "./BlogHome/BlogHome";

const BlogContainer = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: auto;
`;

export const Blog: React.FC = () => {
  const {
    params: { blogSlug },
  } = useMatch();

  console.log(blogSlug);

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
      <BlogNavbar />
      {blogSlug === undefined ? (
        <BlogHome />
      ) : blogPost ? (
        <BlogContainer>
          <BlogPost post={blogPost} />
        </BlogContainer>
      ) : (
        "No matching blog was found."
      )}
    </ThemeContext>
  );
};
