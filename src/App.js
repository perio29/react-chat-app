import styled from "styled-components";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RoomPage } from "./components/RoomPage";

const App = () => {
  return (
    <BrowserRouter>
      <SDiv>
        <Link to="/">Home</Link>
        <br />
        <br />
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/room">Room</Link>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/room/:roomId">
            <RoomPage />
          </Route>
        </Switch>
      </SDiv>
    </BrowserRouter>
  );
};

export default App;

const SDiv = styled.div`
  margin-top: 20px;
  text-align: center;
`;
