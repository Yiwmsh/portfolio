import { CardFooter, CardHeader } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { Helmet } from "react-helmet";
import { ScreenMaxWidth } from "../../../components/MediaQueries";
import { RichTextDisplay } from "../../../components/RichTextEditor/RichTextDisplay";
import { BlogPostProps } from "../../admin";
import { DateData } from "./DateData";
import { PostTags } from "./PostTags";

const ScreenWidthBreakpoints = {
  dateData: 630,
  content: 420,
};

const BlogPostStyle = styled.article`
  margin: 0 5vw 5vw;

  ${ScreenMaxWidth(ScreenWidthBreakpoints.content, `margin: 10px;`)}
`;

const BlogPostCardHeader = styled(CardHeader)`
  margin: 30px 0;
`;

const PostInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${ScreenMaxWidth(
    ScreenWidthBreakpoints.dateData,
    `
 flex-direction: column;
 `
  )}
`;

const Series = styled.h2`
  filter: opacity(50%);
`;

const Title = styled.h1`
  font-size: 2em;
  margin: auto 0;
`;

const Authors = styled.p`
  font-style: italic;
`;

const PostContent = styled.div`
  width: clamp(0px, calc(100% - 10px), 800px);
  margin: auto;

  @media screen and (max-width: ${ScreenWidthBreakpoints.content}px) {
    margin: 0;
  }
`;

const ReadingTime = styled.div``;

export const displayTimestampAsDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const fancyDisplayTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const timeAgo = new Date().getTime() - date.getTime();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  if (timeAgo > 1000 * 60 * 60 * 24) {
    return `${day}/${month}/${year}`;
  } else {
    const secondsAgo = timeAgo / 1000;
    if (secondsAgo > 60) {
      const minutesAgo = secondsAgo / 60;
      if (minutesAgo > 60) {
        const hoursAgo = minutesAgo / 60;
        return `${Math.floor(hoursAgo)} hours ago`;
      }
      return `${Math.floor(minutesAgo)} minutes ago`;
    }
    return `${Math.floor(secondsAgo)} seconds ago`;
  }
};

export const calculateReadingTime = (content: string): string => {
  const words = content.split(" ");
  const minutes = words.length / 238;
  if (minutes < 1) {
    return "1 minute read";
  } else {
    if (minutes > 60) {
      const hours = minutes / 60;
      return `${Math.floor(hours)} hour read`;
    } else {
      return `${Math.floor(minutes)} minute read`;
    }
  }
};

export const BlogPost: React.FC<{
  post: BlogPostProps;
  withoutHelmet?: boolean;
  id?: string;
}> = ({ post, withoutHelmet, id }) => {
  return (
    <BlogPostStyle>
      {withoutHelmet ? (
        ""
      ) : (
        <Helmet>
          <title>{post.title}</title>
          <meta
            name="description"
            content={post.summary ?? post.content.slice(0, 600)}
          />
        </Helmet>
      )}
      <BlogPostCardHeader>
        <PostInformation>
          <DateData
            publishedDate={post.publishedDate}
            lastUpdated={post.lastUpdated}
            smallScreen
          />
          <div>
            <Title>{post.title}</Title>
            {post.series ? <Series>{post.series}</Series> : ""}
            <Authors>{post.authors.join(", ")}</Authors>
          </div>

          <div>
            <DateData
              publishedDate={post.publishedDate}
              lastUpdated={post.lastUpdated}
            />
            <ReadingTime>{post.readingTime}</ReadingTime>
            {post.tags && post.tags.length > 0 ? (
              <PostTags tags={post.tags} />
            ) : (
              ""
            )}
          </div>
        </PostInformation>
      </BlogPostCardHeader>
      <PostContent>
        <RichTextDisplay
          content={post.content}
          withTableOfContents={post.tableOfContents}
        />
      </PostContent>
      <CardFooter></CardFooter>
    </BlogPostStyle>
  );
};
