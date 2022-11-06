import {
  Button,
  Card,
  Modal,
  CardBody,
  TextContent,
  CardFooter,
  ButtonBank,
  Theme,
} from "@yiwmsh/react-carpentry";
import React from "react";
import { useOverlayTriggerState } from "react-stately";
import { LightTheme } from "../consts";

export const WelcomeModal: React.FC<{ theme?: Theme }> = ({ theme }) => {
  const modalState = useOverlayTriggerState({});

  return (
    <>
      <Button onPress={modalState.open}>Open Dialog</Button>
      <Modal theme={LightTheme} state={modalState}>
        <Card width="40%" height="20%">
          <CardBody centerContents>
            <TextContent>This is a card inside a modal! Wow!</TextContent>
          </CardBody>
          <CardFooter>
            <ButtonBank>
              <Button onPress={modalState.close}>Close Dialog</Button>
            </ButtonBank>
          </CardFooter>
        </Card>
      </Modal>
    </>
  );
};
