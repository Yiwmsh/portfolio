import React from "react";
import styled from "@emotion/styled";
import { BlogPostProps } from "../admin";
import { calculateReadingTime, displayTimestampAsDate } from "./BlogPost";
import { SemanticColors } from "@chrisellis/react-carpentry";
import { removeTags } from "../../components";

const SnippetContainer = styled.button`
  display: flex;
  flex-direction: column;
  background-color: var(${SemanticColors.background});
  border: none;
  cursor: pointer;
  height: 150px;
  overflow: hidden;
  justify-content: flex-start;
  font-family: "Arima", cursive;
`;

const BlogPostMetaLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin: 0;
`;

const BlogPostMetaEntry = styled.p`
  margin: 0;
`;

const BlogPostTitle = styled.h2`
  margin: 0;
  text-align: start;
`;

const BlogPostAuthors = styled.i`
  margin: 0;
  text-align: start;
`;

const BlogPostSummary = styled.p`
  margin: 10px 0 0 0;
  text-align: start;
`;

export const BlogSnippet: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  const readTime = calculateReadingTime(post.content);
  return (
    <SnippetContainer
      onClick={() => {
        window.location.assign(`/blog/${post.slug}`);
      }}
    >
      <BlogPostMetaLine>
        <BlogPostMetaEntry>
          {post.publishedDate ? displayTimestampAsDate(post.publishedDate) : ""}
        </BlogPostMetaEntry>
        <BlogPostMetaEntry>·</BlogPostMetaEntry>
        <BlogPostMetaEntry>{readTime}</BlogPostMetaEntry>
      </BlogPostMetaLine>
      <BlogPostTitle>{post.title}</BlogPostTitle>
      <BlogPostAuthors>{post.authors.join(", ")}</BlogPostAuthors>
      <BlogPostSummary>
        {post.summary !== ""
          ? post.summary
          : `${removeTags(post.content.slice(0, 230))}...`}
      </BlogPostSummary>
    </SnippetContainer>
  );
};
