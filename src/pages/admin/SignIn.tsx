import { Button } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, signInWithGoogle } from "../../firebase";
import { AdminDashboard } from "./AdminDashboard";

const SignInContainer = styled.div`
  display: flex;
  height: 100vh;
  width: var(--ViewPortWidth);
  justify-content: center;
  align-items: center;
`;

export const SignInButton: React.FC = () => {
  return (
    <SignInContainer>
      <Button onPress={() => signInWithGoogle()}>
        Prove you're me, stranger
      </Button>
    </SignInContainer>
  );
};

export const CheckAuth = async (): Promise<boolean> => {
  //This database check is not real security, because this admin section does not really need to be secured.
  //The security happens in the firestore rules. But this does feel nicer.
  const authenticationDoc = doc(db, "auth", "authentication");
  const authenticationSnapshot = await getDoc(authenticationDoc);
  return authenticationSnapshot.exists();
};

export const SignInManager: React.FC = () => {
  const [authorized, setAuthorized] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //This database check is not real security, because this admin section does not really need to be secured.
        //The security happens in the firestore rules. But this does feel nicer.
        const isAuthorized = await CheckAuth();

        if (isAuthorized) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          signOut(auth);
        }
      } else {
        setAuthorized(false);
        signOut(auth);
      }
    });
  }, []);

  return <AdminDashboard authorized={authorized} />;
};
