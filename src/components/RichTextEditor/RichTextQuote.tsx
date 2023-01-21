import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";

const RichTextQuoteContainer = styled.blockquote`
  border-left: 3px solid var(${SemanticColors.primary});
  position: relative;
  padding: 20px;
  &:after {
    content: "\f35f";
  }

  &::before {
    content: "“";
    font-size: 3em;
    position: absolute;
    left: 10px;
    top: 0;
  }

  &::after {
    content: "”";
    font-size: 3em;
    position: absolute;
    right: 10px;
    bottom: 0;
  }
`;
const RichTextQuoteContent = styled.p``;
const RichTextQuoteSource = styled.cite``;

export const RichTextQuote: React.FC<{
  quote: string;
  quoteSource: string;
}> = ({ quote, quoteSource }) => {
  return (
    <RichTextQuoteContainer>
      <RichTextQuoteContent>{quote}</RichTextQuoteContent>
      <RichTextQuoteSource>- {quoteSource}</RichTextQuoteSource>
    </RichTextQuoteContainer>
  );
};
