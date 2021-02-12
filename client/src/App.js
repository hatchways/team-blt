import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";


function App() {
  const [signedIn, setSignedIn] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {signedIn 
                ?  <Route exact path='/' component={LandingPage} /> 
                : <Redirect to='/sign-in' />
              }
            </Route>
            <Route exact path='/sign-in' component={SignIn} />
            <Route exact path='/sign-up' component={SignUp} />
          </Switch>
      </BrowserRouter> 
    </ThemeProvider>
  );
}

export default App;
