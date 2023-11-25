import styled from "@emotion/styled";
import { getDocs, query, where } from "firebase/firestore";
import React from "react";
import { Helmet } from "react-helmet";
import { Accordion } from "../../../components/Accordion";
import {
  blogPostsSource,
  wherePublished,
} from "../../../components/BlogPostTools";
import { BlogPostProps } from "../../admin/Blog/blogPostProps";
import { BlogPost } from "./BlogPost";

const BlogPostTitle = styled.h2`
  text-align: center;
`;

const SeriesTitle = styled.h1`
  text-align: center;
`;

export const stringToTitleCase = (input: string): string => {
  const words = input.split(" ");
  const titleCaseWords: string[] = [];
  words.forEach((word) =>
    titleCaseWords.push(`${word.charAt(0).toUpperCase()}${word.slice(1)}`)
  );
  return titleCaseWords.join(" ");
};

export const BlogSeries: React.FC<{ post: BlogPostProps; series: string }> = ({
  post,
  series,
}) => {
  const [seriesPosts, setSeriesPosts] = React.useState<BlogPostProps[]>();

  React.useEffect(() => {
    const getSeriesPosts = async () => {
      const q = query(
        blogPostsSource,
        wherePublished,
        where("series", "array-contains", series)
      );

      const response = await getDocs(q);
      const posts: BlogPostProps[] = [];
      for (let i = 0; i < response.size; i++) {
        try {
          const docData = (await response.docs[i].data()) as BlogPostProps;
          posts.push(docData);
        } catch (e) {
          console.log(e);
        }
      }
      setSeriesPosts(posts);
    };

    getSeriesPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.summary ?? post.content.slice(0, 600)}
        />
      </Helmet>
      <SeriesTitle>{stringToTitleCase(series)}</SeriesTitle>
      {seriesPosts?.map((seriesPost) => (
        <Accordion
          startOpen={seriesPost.uid === post.uid}
          title={<BlogPostTitle>{seriesPost.title}</BlogPostTitle>}
        >
          <BlogPost
            post={seriesPost}
            id={post.uid}
            withoutHelmet
          />
        </Accordion>
      ))}
    </>
  );
};
