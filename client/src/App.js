import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import { AuthProvider } from "./context/context";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute"
import Login from "./pages/SignIn";
import LoginRoute from "./routes/LoginRoute";
import SignUpRoute from "./routes/SignUpRoute";
import SignUp from "./pages/SignUp";
import FriendDashboard from "./components/body/friends/FriendDashboard";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <LoginRoute 
              path={'/login'}
              component={Login}
            />
            <SignUpRoute
              path={'/signup'}
              component={SignUp}
            />
            <ProtectedRoute>
              <Route exact path={'/'} component={UserDashboard} />
              <Route exact path={'/users/:id'} component={FriendDashboard} />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
