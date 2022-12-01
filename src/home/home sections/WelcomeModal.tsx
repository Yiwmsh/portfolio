import {
  ButtonBank,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextContent,
} from "@chrisellis/react-carpentry";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { Modal } from "../../components/Modal";
import { WhatsYourName } from "../../components/WhatsYourName";
import styled from "@emotion/styled";

const AdjustedTextContent = styled(TextContent)`
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  gap: 5px;

  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
`;

const CenteringButtonBank = styled(ButtonBank)`
  justify-content: center;
`;

export const WelcomeModal: React.FC<{
  closeButton: ReactNode;
  welcomeModalOpen: boolean;
}> = ({ closeButton, welcomeModalOpen }) => {
  return (
    <Modal isOpen={welcomeModalOpen}>
      <motion.div
        style={{ width: "100%", height: "100%" }}
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        exit={{ y: "100vh" }}
      >
        <Card centered="both">
          <CardHeader>
            <TextContent>
              <h4>Welcome!</h4>
            </TextContent>
          </CardHeader>
          <CardBody>
            <Row>
              <AdjustedTextContent>
                It's lovely to meet you,
              </AdjustedTextContent>{" "}
              <WhatsYourName withDescription />
            </Row>
          </CardBody>
          <CardFooter>
            <CenteringButtonBank>{closeButton}</CenteringButtonBank>
          </CardFooter>
        </Card>
      </motion.div>
    </Modal>
  );
};
