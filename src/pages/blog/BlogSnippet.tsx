import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import React from "react";
import { removeTags } from "../../components/BlogPostTools";
import { BlogPostProps } from "../admin/Blog/blogPostProps";
import { displayTimestampAsDate } from "./BlogPost/BlogPost";

const SnippetContainer = styled.button<{ featuredPriority: number }>`
  display: flex;
  flex-direction: column;
  background-color: var(${SemanticColors.background});
  border: none;
  cursor: pointer;
  height: 150px;
  overflow: hidden;
  justify-content: flex-start;
  font-family: "Arima", cursive;
  ${({ featuredPriority }) =>
    featuredPriority
      ? `box-shadow: 0 0 5px 2px var(${SemanticColors.primary});`
      : ""}
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

const BlogSnippetRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const BlogSnippetSeries = styled.h3`
  margin: 0;
  filter: opacity(50%);
`;

export const BlogSnippet: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  const readTime = post.readingTime;
  return (
    <SnippetContainer
      featuredPriority={post.featuredPriority}
      onClick={() => {
        window.location.assign(`/blog/post/${post.slug}`);
      }}
    >
      <BlogPostMetaLine>
        <BlogPostMetaEntry>
          {post.publishedDate ? displayTimestampAsDate(post.publishedDate) : ""}
        </BlogPostMetaEntry>
        <BlogPostMetaEntry>·</BlogPostMetaEntry>
        <BlogPostMetaEntry>{readTime}</BlogPostMetaEntry>
      </BlogPostMetaLine>
      <BlogSnippetRow>
        <BlogPostTitle>{post.title}</BlogPostTitle>
        {post.series && post.series.length > 0 ? (
          <BlogSnippetSeries>{post.series[0]}</BlogSnippetSeries>
        ) : (
          ""
        )}
      </BlogSnippetRow>
      <BlogPostAuthors>{post.authors.join(", ")}</BlogPostAuthors>
      <BlogPostSummary>
        {post.summary !== ""
          ? post.summary
          : `${removeTags(post.content.slice(0, 230))}...`}
      </BlogPostSummary>
    </SnippetContainer>
  );
};
