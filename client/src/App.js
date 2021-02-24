import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { theme } from "./themes/theme";
import "./App.css";
import routes from "./routes";
import { AuthProvider } from "./context";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import ProtectedRoutes from "./ProtectedRoutes"

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            {routes.map((route) => (
              <ProtectedRoutes
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
