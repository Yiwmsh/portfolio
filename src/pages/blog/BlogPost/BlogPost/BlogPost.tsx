import { CardFooter } from "@chrisellis/react-carpentry";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { Helmet } from "react-helmet";
import { RichTextDisplay } from "../../../../components/RichTextEditor/RichTextDisplay";
import { BlogPostProps } from "../../../admin/Blog/blogPostProps";
import { DateData } from "../DateData";
import { PostTags } from "../PostTags";
import {
  Authors,
  BlogPostCardHeader,
  BlogPostStyle,
  PostContent,
  PostInformation,
  ReadingTime,
  Series,
  Title,
} from "./BlogPostStyle";

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
