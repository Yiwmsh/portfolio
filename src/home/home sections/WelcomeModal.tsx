import {
  Button,
  ButtonBank,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardToolbar,
  SemanticColors,
  TextContent,
} from "@yiwmsh/react-carpentry";
import { motion } from "framer-motion";
import React from "react";
import { Modal } from "../../components/Modal.tsx";
import { WhatsYourName } from "../../components/WhatsYourName.tsx";
import styled from "@emotion/styled";
import { NameContext } from "../home";

const AdjustedTextContent = styled(TextContent)`
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  gap: 5px;
`;

const CenteringButtonBank = styled(ButtonBank)`
  justify-content: center;
`;

const DoneButton = styled(Button)`
  width: 100%;
`;

export const WelcomeModal: React.FC = () => {
  const [welcomeModalOpen, setWelcomeModalOpen] = React.useState(
    !localStorage.getItem("name")
  );

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
            <CenteringButtonBank>
              <DoneButton onPress={() => setWelcomeModalOpen(false)}>
                Submit
              </DoneButton>
            </CenteringButtonBank>
          </CardFooter>
        </Card>
      </motion.div>
    </Modal>
  );
};
