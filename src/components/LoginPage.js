import { useState } from "react";
import { auth }  from "../firebase/firebase";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    auth.createUserWithEmailAndPassword(email.value, password.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};
