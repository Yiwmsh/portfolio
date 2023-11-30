import { TailSpin } from "react-loader-spinner";
import { BlogPostQuery } from "../../../components/BlogPostTools";
import { useSearchPosts } from "../../../hooks/useSearchPosts";
import { CenteringDiv } from "../BlogHome/BlogHome";
import { BlogHomePostList } from "../BlogHome/BlogHomePostList";

interface BlogSearchResultsProps {
  query: BlogPostQuery;
}

export const BlogSearchResults: React.FC<BlogSearchResultsProps> = ({
  query,
}) => {
  const { data: posts, status } = useSearchPosts(query);

  if (status === "loading") {
    return (
      <CenteringDiv>
        <TailSpin color="var(--primary-color)" />
      </CenteringDiv>
    );
  }

  return (
    <>
      {status === "success" ? (
        <BlogHomePostList posts={posts} />
      ) : status === "error" ? (
        <>Something went wrong!</>
      ) : null}
    </>
  );
};
