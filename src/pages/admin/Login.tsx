import React from "react";
import {
  TextField,
  Card,
  CardBody,
  CardHeader,
  TextContent,
  CardFooter,
  Button,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { CenteringButtonBank } from "../home/home sections/WelcomeModal";

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: radial-gradient(
    circle at center top,
    rgba(246, 217, 89, 1) 0%,
    rgba(208, 124, 80, 1) 10%,
    rgba(100, 60, 86, 1) 22.5%,
    rgba(39, 36, 57, 1) 32.5%,
    rgba(13, 15, 30, 1) 50%
  );
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
    <Backdrop>
      <Card centered="both">
        <CardHeader>
          <h1>
            <TextContent>Please enter your credentials</TextContent>
          </h1>
        </CardHeader>
        <CardBody>
          <TextField type="username" onChange={setUsername} label="Username" />
          <TextField type="password" onChange={setPassword} label="Password" />
        </CardBody>
        <CardFooter>
          <CenteringButtonBank>
            <Button onPress={() => handleLogin(username, password)}>
              Submit
            </Button>
          </CenteringButtonBank>
        </CardFooter>
      </Card>
    </Backdrop>
  );
};
