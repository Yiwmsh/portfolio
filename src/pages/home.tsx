import {
  Card,
  CardBody,
  ScrollSection,
  ScrollSnapper,
  TextContent,
} from "@yiwmsh/react-carpentry";
import React from "react";
import { WhatsYourName } from "../components/WhatsYourName.tsx";
import styled from "@emotion/styled";

const AdjustedTextContent = styled(TextContent)`
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  gap: 5px;
`;

export const Home: React.FC = () => {
  return (
    <ScrollSnapper>
      <ScrollSection>
        <Card centered="both">
          <CardBody>
            <Row>
              <AdjustedTextContent>
                It's lovely to meet you,
              </AdjustedTextContent>{" "}
              <WhatsYourName />
            </Row>
          </CardBody>
        </Card>
      </ScrollSection>
    </ScrollSnapper>
  );
};
