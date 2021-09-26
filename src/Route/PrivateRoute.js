import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return user ? <Component {...routeProps} /> : <Redirect to="/login" />;
      }}
    />
  );
};
