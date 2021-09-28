import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClickLogin = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(email, password);
    history.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button onClick={handleClickLogin}>Login</button>
        <Link to="/signup">登録がまだの方はこちら</Link>
      </form>
    </div>
  );
};
