import { useInfiniteQuery } from "react-query";
import { getFrontPageBlogPosts } from "../components/BlogPostTools";

export const useFrontPageBlogPosts = () =>
  useInfiniteQuery(
    "posts",
    async ({ pageParam = undefined }) => {
      return getFrontPageBlogPosts(15, pageParam);
    },
    {
      getNextPageParam: (lastPage) => lastPage.lastCursor,
    }
  );
