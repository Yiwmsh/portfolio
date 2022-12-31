import { Button } from "@chrisellis/react-carpentry";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { SignInButton } from "./SignIn";
import { BlogPostEditor } from "./Blog/BlogPostEditor";
import { CenteringSection } from "../../components/CenteringSection";

export const AdminDashboard: React.FC<{ authorized: boolean }> = ({
  authorized,
}) => {
  const auth = getAuth();

  return authorized ? (
    <CenteringSection>
      <BlogPostEditor />
      <Button onPress={() => signOut(auth)}>Log Out</Button>
    </CenteringSection>
  ) : (
    <>
      <SignInButton />
    </>
  );
};
