import { CardHeader } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { ScreenMaxWidth } from "../../../../components/MediaQueries";

const ScreenWidthBreakpoints = {
  dateData: 630,
  content: 420,
};
export const BlogPostStyle = styled.article`
  margin: 0 5vw 5vw;

  ${ScreenMaxWidth(ScreenWidthBreakpoints.content, `margin: 10px;`)}
`;
export const BlogPostCardHeader = styled(CardHeader)`
  margin: 30px 0;
`;
export const PostInformation = styled.div`
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
export const Series = styled.h2`
  filter: opacity(50%);
`;
export const Title = styled.h1`
  font-size: 4em;
  margin: auto 0;
`;
export const Authors = styled.p`
  font-style: italic;
`;
export const PostContent = styled.div`
  width: clamp(0px, calc(100% - 10px), 800px);
  margin: auto;

  @media screen and (max-width: ${ScreenWidthBreakpoints.content}px) {
    margin: 0;
  }
`;
export const ReadingTime = styled.div``;
