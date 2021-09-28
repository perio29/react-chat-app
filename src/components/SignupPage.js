import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClickSignup = async (e) => {
    e.preventDefault();
    await auth.createUserWithEmailAndPassword(email, password);
    history.push("/login");
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
        <button onClick={handleClickSignup}>登録</button>
        <Link to="/login">既にアカウントを持っている方はこちら</Link>
      </form>
    </div>
  );
};
