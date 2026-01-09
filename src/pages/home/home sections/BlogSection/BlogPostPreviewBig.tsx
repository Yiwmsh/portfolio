import { TextContent } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "motion/react";
import React from "react";
import { RichTextDisplay } from "../../../../components/RichTextEditor/RichTextDisplay";
import { BlogPostProps } from "../../../admin/Blog/blogPostProps";
import { fancyDisplayTimestamp } from "../../../blog/BlogPost/BlogPost/BlogPost";
import { Navigate } from "../../../scryfall querier/utilities/navigate";
import { BottomBlur } from "./BlogPostPreview";

const BigPreviewContainer = styled(motion.button)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 18fr;
  grid-template-columns: 1fr;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  position: relative;
`;

const BigPreviewHeader = styled.div`
  grid-row: 2;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const BigPreviewTitle = styled.h3`
  grid-row: 1;
`;

const BigPreviewPublishedDate = styled.div``;

const BigPreviewContent = styled.div`
  grid-row: 3;
  text-align: left;
  padding: 0 50px;
`;

export const BlogPostBigPreview: React.FC<{ post?: BlogPostProps }> = ({
  post,
}) => {
  return (
    <>
      {post ? (
        <BigPreviewContainer
          onClick={() => {
            Navigate(`/blog/post/${post.slug}`);
          }}
        >
          <TextContent>
            <BigPreviewTitle>{post.title}</BigPreviewTitle>
            <BigPreviewHeader>
              <div>
                By{post.authors.length > 1 ? ":" : ""} {post.authors.join(", ")}
              </div>
              {"·"}
              <div>{post.readingTime}</div>
              {post.publishedDate !== null &&
              post.publishedDate !== undefined ? (
                <>
                  {"·"}
                  <BigPreviewPublishedDate>
                    {fancyDisplayTimestamp(post.publishedDate)}
                  </BigPreviewPublishedDate>
                </>
              ) : (
                ""
              )}
            </BigPreviewHeader>
            <BigPreviewContent>
              <RichTextDisplay content={post.content} />
            </BigPreviewContent>
          </TextContent>
          <BottomBlur />
        </BigPreviewContainer>
      ) : (
        ""
      )}
    </>
  );
};
