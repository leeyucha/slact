import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Workspace from "./layouts/Workspace";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/singup" component={SignUp} />
        <Route path="/workspace" component={Workspace} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
