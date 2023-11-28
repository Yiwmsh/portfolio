import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { CenteringSection } from "../../components/CenteringSection";
import { RichTextEditor } from "../../components/RichTextEditor/RichTextEditor";
import { BlogAdminPanel } from "./Blog/BlogAdminPanel";
import { SignInButton } from "./SignIn";

const SignOutButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const ScrollSection = styled.div`
  overflow-x: scroll;
`;

export const AdminDashboard: React.FC<{ authorized: boolean }> = ({
  authorized,
}) => {
  const auth = getAuth();

  return authorized ? (
    <CenteringSection>
      <ScrollSection>
        <BlogAdminPanel />
        {/* <TestSegment /> */}
        <SignOutButton onPress={() => signOut(auth)}>Sign Out</SignOutButton>
      </ScrollSection>
    </CenteringSection>
  ) : (
    <>
      <SignInButton />
    </>
  );
};

const TestSegment: React.FC = () => {
  const [text, setText] = React.useState("");
  return (
    <Card
      centered="both"
      width="80%"
      height="80%"
    >
      <CardHeader />
      <CardBody>
        <RichTextEditor
          onChange={setText}
          value={text}
        />
      </CardBody>
      <CardFooter />
    </Card>
  );
};
