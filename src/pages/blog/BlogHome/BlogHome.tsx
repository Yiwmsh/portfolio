import styled from "@emotion/styled";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useBlogPostTags } from "../../../hooks/useBlogTags";
import { useFrontPageBlogPosts } from "../../../hooks/useFrontPageBlogPosts";
import { BlogHomeHeader } from "./BlogHomeHeader";
import { BlogHomePostList } from "./BlogHomePostList";

const CenteringDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;
  margin: 10% 0;
`;

const ThatsAllForNow = styled.div`
  margin: auto;
  text-align: center;
  font-size: medium;
`;

export const BlogHome: React.FC = () => {
  const {
    data,
    status: postQueryStatus,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFrontPageBlogPosts();
  const { data: tags, status: tagQueryStatus } = useBlogPostTags();

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      postQueryStatus === "loading" ||
      !hasNextPage
    ) {
      return;
    }
    console.log("Fetching next page");
    fetchNextPage();
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postQueryStatus]);

  const posts =
    postQueryStatus === "success"
      ? data.pages.flatMap((page) => page.posts)
      : [];

  return (
    <>
      <BlogHomeHeader tags={tagQueryStatus === "success" ? tags : []} />
      {postQueryStatus === "success" ? (
        <BlogHomePostList posts={posts} />
      ) : null}
      {postQueryStatus === "loading" || isFetchingNextPage ? (
        <CenteringDiv>
          <TailSpin color="var(--primary-color)" />
        </CenteringDiv>
      ) : null}
      {postQueryStatus === "success" && !hasNextPage && posts.length > 0 ? (
        <ThatsAllForNow>
          Looks like that's it for now. Check back another time to see if
          there's more!
        </ThatsAllForNow>
      ) : null}
    </>
  );
};
