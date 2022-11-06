import styled from "@emotion/styled";
import { Card, CardBody, TextContent } from "@yiwmsh/react-carpentry";
import React from "react";
import { CenteringSection } from "../../components/CenteringSection.tsx";
import { WhatsYourName } from "../../components/WhatsYourName.tsx";

const AdjustedTextContent = styled(TextContent)`
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  gap: 5px;
`;

export const GreetingSection: React.FC = () => {
  return (
    <CenteringSection>
      <Card>
        <CardBody>
          <Row>
            <AdjustedTextContent>It's lovely to meet you,</AdjustedTextContent>{" "}
            <WhatsYourName withDescription />
          </Row>
        </CardBody>
      </Card>
    </CenteringSection>
  );
};
