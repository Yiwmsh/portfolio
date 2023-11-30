import { useQuery } from "react-query";
import { BlogPostQuery, getPostsBySearch } from "../components/BlogPostTools";

export const useSearchPosts = (search: BlogPostQuery) =>
  useQuery(["posts", search], async ({ pageParam = undefined }) => {
    return getPostsBySearch(search);
  });
