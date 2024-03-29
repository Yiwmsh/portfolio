import { getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useMatch } from "react-router-dom";
import {
  blogPostsSource,
  wherePublished,
} from "../../../components/BlogPostTools";
import { BlogPostProps } from "../../admin/Blog/blogPostProps";
import { BlogPost } from "./BlogPost/BlogPost";
import { BlogSeries } from "./BlogSeries";

export const BlogPostHandler: React.FC = () => {
  const match = useMatch("blog/post/:blogSlug");

  const blogSlug = match ? match.params.blogSlug : undefined;
  const [blogPost, setBlogPost] = React.useState<BlogPostProps | undefined>(
    undefined
  );

  React.useEffect(() => {
    const getPost = async () => {
      const q = query(
        blogPostsSource,
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

  if (!blogPost) {
    return null;
  }

  return (
    <>
      {" "}
      {blogPost.series && blogPost.series.length > 0 ? (
        <BlogSeries
          post={blogPost}
          series={blogPost.series[0]}
        />
      ) : (
        <BlogPost post={blogPost} />
      )}
    </>
  );
};
