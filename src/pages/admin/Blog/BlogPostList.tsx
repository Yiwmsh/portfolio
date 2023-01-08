import { Card, TextContent } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";

const PostList = styled.div`
  overflow-y: auto;
  height: 70vh;
`;

const Post = styled.button`
  width: 100%;
  border-radius: 0%;
  background-color: transparent;
  border: 1px solid black;
  margin-bottom: 5px;
`;

export const BlogPostList: React.FC<{
  postTitles: string[];
  setCurrentPost: (title: string) => void;
}> = ({ postTitles, setCurrentPost }) => {
  return (
    <Card width="10vw" height="80vh">
      <TextContent>
        <h3>Blog Posts</h3>
      </TextContent>
      <PostList>
        <Post
          onClick={() => {
            setCurrentPost("");
          }}
        >
          New Post
        </Post>
        {postTitles.map((title) =>
          title ? (
            <Post
              onClick={() => {
                setCurrentPost(title);
              }}
            >
              {title}
            </Post>
          ) : (
            ""
          )
        )}
      </PostList>
    </Card>
  );
};
