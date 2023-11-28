import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";

const borderWidth = "2px";
const cornerSize = "30px";

export const SnippetContainer = styled.li`
  list-style: none;
  display: inline-block;
  position: relative;
  border: ${borderWidth} solid var(${SemanticColors.primary});
  cursor: pointer;
  height: 150px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: var(${SemanticColors.background});
    z-index: 0;
    transition: 200ms ease-in;
    transform-origin: center center;
  }

  &::before {
    width: calc(100% + ${borderWidth} * 2 - ${cornerSize});
    height: calc(100% + ${borderWidth} * 2);
    top: -${borderWidth};
    left: 50%;
    transform: translateX(-50%);
  }

  ::after {
    height: calc(100% + ${borderWidth} * 2 - ${cornerSize});
    width: calc(100% + ${borderWidth} * 2);
    left: -${borderWidth};
    top: 50%;
    transform: translateY(-50%);
  }

  &&:hover::after {
    height: 0;
  }

  &&:hover::before {
    width: 0;
  }
`;

export const SnippetContent = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
  font-family: "Arima", cursive;
  font-size: 13px;
  max-width: calc(100% - 10px);
  max-height: calc(100% - 10px);
  overflow: hidden;
  margin: 5px;
  text-align: center;
`;

export const BlogPostMetaLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3px;
  margin: 0;
`;
export const BlogPostMetaEntry = styled.p`
  margin: 0;
`;
export const BlogPostTitle = styled.h2`
  margin: 0;
`;
export const BlogPostAuthors = styled.i`
  margin: 0;
`;
export const BlogPostSummary = styled.p`
  margin: 10px 0 0 0;
`;
export const BlogPostSnippetRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;
export const BlogPostSnippetSeries = styled.h3`
  margin: 0;
  filter: opacity(50%);
`;
