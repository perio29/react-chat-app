import { Route, Switch, BrowserRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";
import { RoomPage } from "./RoomPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/rooms/:roomId" component={RoomPage} />
      </Switch>
    </BrowserRouter>
  );
};
