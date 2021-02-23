import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

function App() {
  // this can be used to show all the user information in dataset.

  // useEffect(() => {
  //   fetch('/users').then(response =>
  //     response.json().then(data =>
  //       {console.log(data);}))
  // }, [])
  const [signedIn, setSignedIn] = useState(true);
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {signedIn ? (
              <Route exact path="/" component={UserDashboard} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
