import styled from "@emotion/styled";
import { defaultBoxShadow } from "../../consts";

const defaultPadding = 10;

export const RichTextBold = styled.b``;
export const RichTextItalic = styled.i``;
export const RichTextH1 = styled.h1`
  margin: 0;
`;
export const RichTextH2 = styled.h2`
  margin: 0;
`;
export const RichTextH3 = styled.h3`
  margin: 0;
`;
export const RichTextH4 = styled.h4`
  margin: 0;
`;
export const RichTextP = styled.p``;
export const RichTextStrikeThrough = styled.s``;
export const RichTextSubscript = styled.sub``;
export const RichTextSuperscript = styled.sup``;
export const RichTextImg = styled.img``;
export const RichTextVid = styled.iframe``;
export const RichTextCode = styled.div`
  background-color: #708090;
  color: white;
`;
export const RichTextLink = styled.a``;
export const RichTextBorderedSection = styled.div`
  border: 1px solid black;
`;
export const RichTextCentered = styled.div`
  display: flex;
  justify-content: center;
`;
export const RichTextPaddedSection = styled.div<{ padding?: number }>`
  padding: ${({ padding }) => padding ?? defaultPadding}px;
`;
export const RichTextShadowedSection = styled.div`
  box-shadow: ${defaultBoxShadow};
`;
export const RichTextCard = styled.div`
  box-shadow: ${defaultBoxShadow};
  padding: ${defaultPadding}px;
  border-radius: 10px;
`;
