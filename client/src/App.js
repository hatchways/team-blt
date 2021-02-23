import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";


function App() {
  const [signedIn, setSignedIn] = useState(true);

  const token = JSON.parse(localStorage.getItem('token'));
  // console.log(token);
  // if (!token){
  //   setSignedIn(false);
  // }

  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
