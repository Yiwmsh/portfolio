import React from "react";
import { removeTags } from "../../../../components/BlogPostTools";
import { BlogPostProps } from "../../../admin/Blog/blogPostProps";
import { Navigate } from "../../../scryfall querier/utilities/navigate";
import { displayTimestampAsDate } from "../BlogPost/BlogPost";
import {
  BlogPostAuthors,
  BlogPostMetaEntry,
  BlogPostMetaLine,
  BlogPostSnippetRow,
  BlogPostSnippetSeries,
  BlogPostSummary,
  BlogPostTitle,
  SnippetContainer,
  SnippetContent,
} from "./BlogPostSnippetStyle";

export const BlogSnippet: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  const readTime = post.readingTime;
  return (
    <SnippetContainer
      onClick={() => {
        Navigate(`/blog/post/${post.slug}`);
      }}
    >
      <SnippetContent>
        <BlogPostMetaLine>
          <BlogPostMetaEntry>
            {post.publishedDate
              ? displayTimestampAsDate(post.publishedDate)
              : ""}
          </BlogPostMetaEntry>
          <BlogPostMetaEntry>·</BlogPostMetaEntry>
          <BlogPostMetaEntry>{readTime}</BlogPostMetaEntry>
        </BlogPostMetaLine>
        <BlogPostSnippetRow>
          <BlogPostTitle>{post.title}</BlogPostTitle>
          {post.series && post.series.length > 0 ? (
            <BlogPostSnippetSeries>{post.series[0]}</BlogPostSnippetSeries>
          ) : (
            ""
          )}
        </BlogPostSnippetRow>
        <BlogPostAuthors>{post.authors.join(", ")}</BlogPostAuthors>
        <BlogPostSummary>
          {post.summary !== ""
            ? post.summary
            : `${removeTags(post.content.slice(0, 230))}...`}
        </BlogPostSummary>
      </SnippetContent>
    </SnippetContainer>
  );
};
