import { auth } from "../firebase/firebase";
import { Link, useHistory } from "react-router-dom";

export const LoginPage = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    auth.signInWithEmailAndPassword(email.value, password.value);
    history.push("/");
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
        <div>
          ユーザー登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};
