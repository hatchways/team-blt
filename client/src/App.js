import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import { AuthProvider } from "./context/context";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import ProtectedRoute from "./routes/ProtectedRoute"
import LandingPage from './pages/Landing';
import Login from "./pages/SignIn";
import LoginRoute from "./routes/LoginRoute";
import SignUpRoute from "./routes/SignUpRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <LoginRoute
              path={'/login' || '/signup'}
              component={Login}
            />
            <SignUpRoute
              path={'/signup'}
              component={SignUp}
            />
            <ProtectedRoute
              path={'/'}
              component={LandingPage}
            />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
