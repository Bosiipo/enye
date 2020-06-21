import React, { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  uid: string | null;
  phoneNumber: string | null;
  providerData: (firebase.UserInfo | null)[];
}

export const AuthProvider: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [signInStatus, setSignInStatus] = useState<string>("");

  const onAuthStateChange = () => {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in.
          user.getIdToken().then((accessToken) => {
            let user_details = {
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              providerData: user.providerData,
              accessToken,
            };
            setSignInStatus("Signed in");
            setCurrentUser(user_details);
            // This LINE for navbar
            // document.getElementById("sign-in").textContent = "Sign out";
          });
        } else {
          // User is signed out.
          setSignInStatus("Signed out");
          // For Navbar
          // document.getElementById("sign-in").textContent = "Sign in";
          setCurrentUser(null);
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    return onAuthStateChange();
  }, []);

  return <AuthProvider>{currentUser}</AuthProvider>;
};
