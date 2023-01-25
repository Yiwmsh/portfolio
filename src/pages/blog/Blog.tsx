import { ThemeContext } from "@chrisellis/react-carpentry";
import { useMatch } from "@tanstack/react-location";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { wherePublished } from "../../components";
import { LightTheme } from "../../consts";
import { db } from "../../firebase";
import { BlogPostProps } from "../admin";
import { BlogHome } from "./BlogHome/BlogHome";
import { BlogPost } from "./BlogPost/BlogPost";
import { BlogSeries } from "./BlogPost/BlogSeries";
import { Navbar } from "./Navbar";

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
        collection(
          db,
          process.env.REACT_APP_blogPostCollection ?? "blog-posts"
        ),
        wherePublished,
        where("slug", "==", blogSlug)
      );
      const response = await getDocs(q);
      const post = await (response.docs[0].data() as BlogPostProps);
      setBlogPost(post);
    };

    if (blogSlug !== undefined) {
      getPost();
    }
  }, []);
  return (
    <ThemeContext theme={LightTheme}>
      <Navbar />
      {blogSlug === undefined ? (
        <BlogHome />
      ) : blogPost ? (
        blogPost.series && blogPost.series.length > 0 ? (
          <BlogSeries
            post={blogPost}
            series={blogPost.series[0]}
          />
        ) : (
          <BlogPost post={blogPost} />
        )
      ) : (
        ""
      )}
    </ThemeContext>
  );
};
