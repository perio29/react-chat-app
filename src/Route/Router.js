import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { LoginPage } from "../components/LoginPage";
import { RoomPage } from "../components/RoomPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/rooms/:roomId">
          <RoomPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
