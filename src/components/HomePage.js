import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
