import {
  Button,
  Card,
  TextContent,
  TextField,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { Row } from "../../../components";

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

const SearchButton = styled(Button)`
  margin: 20px 0;
`;

export const BlogPostList: React.FC<{
  postTitles: string[];
  setCurrentPost: (title: string) => void;
  searchFieldChanged: (value: string) => void;
  searchButtonClicked: () => void;
}> = ({
  postTitles,
  setCurrentPost,
  searchButtonClicked,
  searchFieldChanged,
}) => {
  return (
    <Card width="10vw" height="80vh">
      <TextContent>
        <h3>Blog Posts</h3>
      </TextContent>
      <TextField label="Search" onChange={searchFieldChanged} />
      <SearchButton onPress={searchButtonClicked}>Search</SearchButton>
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
