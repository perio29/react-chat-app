import React, { useEffect } from "react";
import { auth } from "../firebase";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { useState } from "react";

export const HomePage = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const history = useHistory();

  const handleClickLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    history.push("/login");
  };

  useEffect(() => {
    let isMounted = true;
    auth.onAuthStateChanged((user) => {
      const authUser = user;

      if (isMounted) {
        if (authUser) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {isSignedIn && (
        <>
          <h1>Home</h1>
          <button onClick={handleClickLogout}>ログアウト</button>
        </>
      )}
      {!isSignedIn && <Redirect to="/signup" />}
    </>
  );
};
