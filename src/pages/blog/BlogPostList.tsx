import { Button } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { BlogPostProps } from "../admin/Blog/blogPostProps";
import { BlogSnippet } from "./BlogSnippet";

const ThatsAllForNow = styled.div``;

const MoreContent = styled.div`
  grid-column-start: 1;
  grid-column-end: span 3;
  display: flex;
  place-content: center;
  margin-bottom: 50px;
`;

export const BlogPostList: React.FC<{
  posts: BlogPostProps[];
  maxPosts?: number;
  loadNextPage: () => void;
}> = ({ posts, maxPosts, loadNextPage }) => {
  return (
    <>
      {posts ? posts.map((post) => <BlogSnippet post={post} />) : ""}
      <MoreContent>
        {maxPosts && posts.length < maxPosts ? (
          <Button onPress={loadNextPage}>Load More</Button>
        ) : (
          <ThatsAllForNow>
            It looks like that's it for the time being - check back later for
            more!
          </ThatsAllForNow>
        )}
      </MoreContent>
    </>
  );
};
