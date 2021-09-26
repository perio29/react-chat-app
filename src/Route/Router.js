import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { RoomPage } from "../components/RoomPage";
import { SignUp } from "../components/SignUp";
import { AuthProvider } from "../context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/signup" component={SignUp} />
          <Route path="/rooms/:roomId" component={RoomPage} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
