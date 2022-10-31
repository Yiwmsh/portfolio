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
import { useEffect } from "react";

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
  const storedName = localStorage.getItem("name");

  const [name, setName] = React.useState(storedName ?? "Friend");
  React.useEffect(() => {
    document.addEventListener("onNameChange", () =>
      setName(localStorage.getItem("name") ?? "Friend")
    );
  });
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
            <TextContent>Your name is: {name}</TextContent>
          </CardBody>
        </Card>
      </ScrollSection>
    </ScrollSnapper>
  );
};
