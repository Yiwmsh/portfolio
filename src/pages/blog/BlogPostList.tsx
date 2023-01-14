import { BlogPostProps } from "../admin";
import { BlogSnippet } from "./BlogSnippet";

export const BlogPostList: React.FC<{ posts: BlogPostProps[] }> = ({
  posts,
}) => {
  return <>{posts ? posts.map((post) => <BlogSnippet post={post} />) : ""}</>;
};
