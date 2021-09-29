import React, { useState } from "react";
import { auth } from "../firebase";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignup = async (e) => {
    e.preventDefault();
    await auth.createUserWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <div>
          <label>email</label>
          <input
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={onClickSignup}>登録</button>
      </form>
    </div>
  );
};
