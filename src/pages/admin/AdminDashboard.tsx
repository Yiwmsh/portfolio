import { Button } from "@chrisellis/react-carpentry";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { SignInButton } from "./SignIn";
import { BlogPostEditor } from "./Blog/BlogPostEditor";
import { CenteringSection } from "../../components/CenteringSection";
import styled from "@emotion/styled";
import { BlogPostList } from "./Blog/BlogPostList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { BlogAdminPanel } from "./Blog/BlogAdminPanel";

const SignOutButton = styled(Button)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export const AdminDashboard: React.FC<{ authorized: boolean }> = ({
  authorized,
}) => {
  const auth = getAuth();

  return authorized ? (
    <CenteringSection>
      <BlogAdminPanel />
      <SignOutButton onPress={() => signOut(auth)}>Sign Out</SignOutButton>
    </CenteringSection>
  ) : (
    <>
      <SignInButton />
    </>
  );
};
