import { Button } from "@chrisellis/react-carpentry";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { SignInButton } from "./SignIn";

export const AdminDashboard: React.FC<{ authorized: boolean }> = ({
  authorized,
}) => {
  const auth = getAuth();

  return authorized ? (
    <>
      <p>Placeholder</p>
      <Button onPress={() => signOut(auth)}>Log Out</Button>
    </>
  ) : (
    <>
      <SignInButton />
    </>
  );
};
