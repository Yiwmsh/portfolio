import { BlogPostProps } from "../admin";
import { BlogSnippet } from "./BlogSnippet";
import styled from "@emotion/styled";

const ThatsAllForNow = styled.div`
  padding: 50px;
`;

export const BlogPostList: React.FC<{ posts: BlogPostProps[] }> = ({
  posts,
}) => {
  return (
    <>
      {posts ? posts.map((post) => <BlogSnippet post={post} />) : ""}
      <ThatsAllForNow>
        It looks like that's it for the time being - check back later for more!
      </ThatsAllForNow>
    </>
  );
};
