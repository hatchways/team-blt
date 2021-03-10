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
import OtherUserDashboard from "./components/body/otherUser/OtherUserDashboard";
import OtherUserContext from "./context/OtherUserContext";
import Friends from "./features/Friends";
import Notifications from "./features/Notifications";
import Navbar from "./components/header/Navbar";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <OtherUserContext>
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
                <Navbar />
                <Route exact path={'/'} component={UserDashboard} />
                <Route exact path={'/friends'} component={Friends} />
                <Route exact path={'/notifications'} component={Notifications} />
                <Route exact path={'/users/:id'} component={OtherUserDashboard} />    
              </ProtectedRoute>
            </Switch>
          </BrowserRouter>
        </OtherUserContext>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
