import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import { theme, modalStyles } from "./themes/theme";

import Modal from 'react-modal';

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/Landing";


Modal.setAppElement('#root');

function App() {
  const [signedIn, setSignedIn] = useState(true);
  
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
          <Route exact path="/">
            {!signedIn ? <Redirect to="/sign-in" /> : <LandingPage />}
          </Route>
          <Route exact path="/sign-in">
            {signedIn ? <Redirect to="/" /> : <SignIn />}
          </Route>
          <Route exact path="/sign-up">
            {signedIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
      </BrowserRouter>    
    </MuiThemeProvider>
  );
}

export default App;
