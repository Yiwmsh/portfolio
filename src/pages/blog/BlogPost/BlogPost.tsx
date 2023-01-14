import React from "react";
import { BlogPostProps } from "../../admin";
import { CardBody, CardFooter, CardHeader } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { Timestamp } from "firebase/firestore";
import { RichTextDisplay } from "../../../components/RichTextEditor/RichTextDisplay";
import { Helmet } from "react-helmet";

const BlogPostCardHeader = styled(CardHeader)`
  margin: 30px 0;
`;

const BlogPostCard = styled.article`
  padding: 0px 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin: auto 0;
`;

const Authors = styled.p`
  font-style: italic;
  font-size: 0.8em;
`;

const DateData = styled.ul`
  font-size: 0.8em;
  list-style: none;
  display: inline-flex;

  & > li {
    margin: 5px;
  }
`;

const PublishedDate = styled.li``;

const UpdatedDate = styled.li``;

const PostContent = styled.div``;

const ReadingTime = styled.div``;

export const displayTimestampAsDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  const timeAgo = new Date().getTime() - date.getTime();
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

export const BlogPost: React.FC<{ post: BlogPostProps }> = ({ post }) => {
  return (
    <BlogPostCard>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 600)} />
      </Helmet>
      <BlogPostCardHeader>
        <Row>
          <div>
            <Title>{post.title}</Title>
            <Authors>{post.authors.join(", ")}</Authors>
          </div>

          <div>
            <DateData>
              <PublishedDate>
                Published{" "}
                {fancyDisplayTimestamp(post.publishedDate ?? Timestamp.now())}
              </PublishedDate>
              <li>&#183;</li>
              <UpdatedDate>
                Last Updated{" "}
                {fancyDisplayTimestamp(post.lastUpdated ?? Timestamp.now())}
              </UpdatedDate>
            </DateData>
            <ReadingTime>{calculateReadingTime(post.content)}</ReadingTime>
          </div>
        </Row>
      </BlogPostCardHeader>
      <CardBody>
        <PostContent>
          <RichTextDisplay content={post.content} />
        </PostContent>
      </CardBody>
      <CardFooter></CardFooter>
    </BlogPostCard>
  );
};
