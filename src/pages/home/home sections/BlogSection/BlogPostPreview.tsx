import { SemanticColors, TextContent } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { RichTextDisplay } from "../../../../components/RichTextEditor/RichTextDisplay";
import { Row } from "../../../../components/Row";
import { BlogPostProps } from "../../../admin";
import {
  calculateReadingTime,
  fancyDisplayTimestamp,
} from "../../../blog/BlogPost/BlogPost";

const BlogPostPreviewContainer = styled(motion.button)`
  position: relative;
  grid-row: auto;
  overflow: hidden;
  height: calc(10vh - 5px);
  background-color: var(${SemanticColors.foreground});
  padding: 5px;
  border: none;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const BlogPostPreviewTitle = styled.b``;

const BlogPostPreviewReadingTime = styled.i``;

const BlogPostPreviewSnippet = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BottomBlur = styled.div`
  position: absolute;
  height: 1em;
  bottom: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(1px);
`;

const BlogPostPreviewPublishedDate = styled.div``;

export const BlogPostPreview: React.FC<{ post: BlogPostProps }> = ({
  post,
}) => {
  const readingTime = calculateReadingTime(post.content);
  return (
    <BlogPostPreviewContainer
      onClick={() => {
        window.location.assign(`/blog/post/${post.slug}`);
      }}
      whileHover={{ scale: 1.05 }}
    >
      <TextContent>
        <Row>
          <BlogPostPreviewTitle>{post.title}</BlogPostPreviewTitle>
          {"·"}
          <BlogPostPreviewReadingTime>{readingTime}</BlogPostPreviewReadingTime>
          {post.publishedDate !== null && post.publishedDate !== undefined ? (
            <>
              {"·"}
              <BlogPostPreviewPublishedDate>
                {fancyDisplayTimestamp(post.publishedDate)}
              </BlogPostPreviewPublishedDate>
            </>
          ) : (
            ""
          )}
        </Row>
        <BlogPostPreviewSnippet>
          <RichTextDisplay
            content={
              post.summary === "" ? post.content.slice(0, 600) : post.summary
            }
          />
        </BlogPostPreviewSnippet>
      </TextContent>
      <BottomBlur />
    </BlogPostPreviewContainer>
  );
};
