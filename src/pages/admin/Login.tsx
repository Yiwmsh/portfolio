import React from "react";
import {
  TextField,
  Card,
  CardBody,
  CardHeader,
  TextContent,
  CardFooter,
  Button,
  SemanticColors,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { CenteringButtonBank } from "../home/home sections/WelcomeModal";

const ErrorMessage = styled.p<{ show: boolean }>`
  color: var(${SemanticColors.error});
  display: ${({ show }) => (show ? "inline" : "none")};
  text-align: center;
`;

export const Login: React.FC<{
  loginHandler: (username: string, password: string) => boolean;
}> = ({ loginHandler }) => {
  const [falseCredentials, setFalseCredentials] = React.useState(false);

  const handleLogin = (username: string, password: string) => {
    setFalseCredentials(!loginHandler(username, password));
  };
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Card centered="both">
      <CardHeader>
        <h1>
          <TextContent>Please enter your credentials</TextContent>
        </h1>
      </CardHeader>
      <CardBody>
        <TextField type="username" onChange={setUsername} label="Username" />
        <TextField type="password" onChange={setPassword} label="Password" />
        <ErrorMessage show={falseCredentials}>
          Incorrect Credentials!
        </ErrorMessage>
      </CardBody>
      <CardFooter>
        <CenteringButtonBank>
          <Button onPress={() => handleLogin(username, password)}>
            Submit
          </Button>
        </CenteringButtonBank>
      </CardFooter>
    </Card>
  );
};
