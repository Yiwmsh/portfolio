import styled from "@emotion/styled";
import React from "react";
import { BlogPostProps } from "../../../admin";
import { BlogPostPreview } from "./BlogPostPreview";
import { TextContent } from "@chrisellis/react-carpentry";

const BlogPostPreviewListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 5px;
  overflow: hidden;
`;

const LastEntry = styled.p`
  text-align: center;
`;

export const BlogPostPreviewList: React.FC<{ posts: BlogPostProps[] }> = ({
  posts,
}) => {
  return (
    <BlogPostPreviewListGrid>
      {posts.map((post) => (
        <BlogPostPreview post={post} />
      ))}
      {posts.length < 10 ? (
        <LastEntry>
          <TextContent>
            That's it for the time being - check back later for more!
          </TextContent>
        </LastEntry>
      ) : (
        <LastEntry>
          <TextContent>
            Find more <a href="/blog">here</a>
          </TextContent>
        </LastEntry>
      )}
    </BlogPostPreviewListGrid>
  );
};
