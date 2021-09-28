import React, { useState } from "react";
import { auth } from "../firebase";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button onClick={onClickLogin}>Login</button>
      </form>
    </div>
  );
};
