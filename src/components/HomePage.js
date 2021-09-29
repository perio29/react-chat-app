import React, { useEffect } from "react";
import { auth } from "../firebase";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { useState } from "react";

export const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const onClickLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    history.push("/login");
  };

  useEffect(() => {
    let isMounted = true;
    auth.onAuthStateChanged((user) => {
      const userId = user;
      console.log(userId);

      if (isMounted) {
        if (userId) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLogin) {
    return (
      <div>
        <h1>home</h1>
        <button onClick={onClickLogout}>ログアウト</button>
      </div>
    );
  } else {
    return <Redirect to="/signup" />;
  }
};
