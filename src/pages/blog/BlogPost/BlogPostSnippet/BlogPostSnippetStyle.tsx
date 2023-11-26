import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";

export const SnippetContainer = styled.button`
  display: flex;
  flex-direction: column;
  background-color: var(${SemanticColors.background});
  border: none;
  cursor: pointer;
  height: 150px;
  overflow: hidden;
  justify-content: flex-start;
  font-family: "Arima", cursive;
`;
export const BlogPostMetaLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin: 0;
`;
export const BlogPostMetaEntry = styled.p`
  margin: 0;
`;
export const BlogPostTitle = styled.h2`
  margin: 0;
  text-align: start;
`;
export const BlogPostAuthors = styled.i`
  margin: 0;
  text-align: start;
`;
export const BlogPostSummary = styled.p`
  margin: 10px 0 0 0;
  text-align: start;
`;
export const BlogPostSnippetRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
export const BlogPostSnippetSeries = styled.h3`
  margin: 0;
  filter: opacity(50%);
`;
