import { ScrollSection } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";

export const CenteringSection = styled(ScrollSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-height: 1000px) {
  }
`;
