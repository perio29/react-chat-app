import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
