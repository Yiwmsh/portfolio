import { ThemeContext } from "@chrisellis/react-carpentry";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  GetAllBlogPostsCount,
  GetBlogPostsByQuery,
  GetFrontPageBlogPosts,
  blogPostsSource,
} from "../../../components/BlogPostTools";
import { LightTheme } from "../../../consts/theme";
import { BlogPostProps } from "../../admin/Blog/blogPostProps";
import { BlogPostList } from "../BlogPostList";

export const BlogPosts: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [blogPosts, setBlogPosts] = React.useState<BlogPostProps[]>([]);
  const [allPostsCount, setAllPostsCount] = React.useState<number>();

  React.useEffect(() => {
    const getBlogPosts = async () => {
      const universalSearch = searchParams.get("search");
      if (!universalSearch) {
        setBlogPosts(await GetFrontPageBlogPosts(30));
      } else {
        console.log(universalSearch);
        if (universalSearch) {
          setBlogPosts(await GetBlogPostsByQuery(true, universalSearch));
        }
      }
      setAllPostsCount(await GetAllBlogPostsCount(true));
    };

    getBlogPosts();
  }, [searchParams]);

  const loadNextPage = async () => {
    const nextPage = await GetFrontPageBlogPosts(
      30,
      await getDoc(doc(blogPostsSource, blogPosts[blogPosts.length - 1].uid))
    );
    setBlogPosts([...blogPosts, ...nextPage]);
  };

  return (
    <ThemeContext theme={LightTheme}>
      {searchParams.entries.length === 0 ? (
        <BlogPostList
          posts={blogPosts}
          loadNextPage={loadNextPage}
          maxPosts={allPostsCount}
        />
      ) : (
        <></>
      )}
    </ThemeContext>
  );
};
