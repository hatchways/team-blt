import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


function App() {
  // this can be used to show all the user information in dataset.

  // useEffect(() => {
  //   fetch('/users').then(response =>
  //     response.json().then(data =>
  //       {console.log(data);}))
  // }, [])
  const [signedIn, setSignedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {signedIn
                ?  <Route exact path='/' component={LandingPage} />
                : <Redirect to='/login' />
              }
            </Route>
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
