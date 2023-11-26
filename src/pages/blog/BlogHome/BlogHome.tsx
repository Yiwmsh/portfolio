import styled from "@emotion/styled";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useBlogPostTags } from "../../../hooks/useBlogTags";
import { useFrontPageBlogPosts } from "../../../hooks/useFrontPageBlogPosts";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePostList } from "./BlogHomePostList";

const CenteringDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;
  margin: 10% 0;
`;

export const BlogHome: React.FC = () => {
  const { data: posts, status: postQueryStatus } = useFrontPageBlogPosts();
  const { data: tags, status: tagQueryStatus } = useBlogPostTags();

  return (
    <>
      <BlogHomeHeader tags={tagQueryStatus === "success" ? tags : []} />
      {postQueryStatus === "success" ? (
        <BlogHomePostList posts={posts.pages.flat()} />
      ) : postQueryStatus === "loading" ? (
        <CenteringDiv>
          <TailSpin color="var(--primary-color)" />
        </CenteringDiv>
      ) : null}
    </>
  );
};
