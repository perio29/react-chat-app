import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rePassword, setRePassword] = useState("");

  const history = useHistory();

  const handleClickSignup = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password).then(
        auth.onAuthStateChanged((user) => {
          if (user !== null) {
            db.collection("users")
              .doc(auth.currentUser.uid)
              .set({ displayName });
          }
        })
      );
      history.push("/");
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <div>
          <label>email</label>
          <input
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>password再入力</label>
          <input
            type="password"
            value={rePassword}
            placeholder="password"
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <div>
          <label>表示名</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button onClick={handleClickSignup} disabled={password !== rePassword}>
          登録
        </button>
        <Link to="/login">既にアカウントがある方はこちら</Link>
      </form>
    </div>
  );
};
