import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DF1B1B",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "50px",
        marginBottom: "50px",
        padding: "20px 50px",
      },
    },
    MuiTextField: {
      root: {
        marginBottom: "50px",
        boxShadow: "0px 5px 17px -7px rgba(0, 0, 0, 0.25)",
      },
    },
  },
});

export const modalStyles = {
  overlay: {
    background: "rgba(36,39,60, 0.5)",
  },
  content: {
    position: "fixed",
    width: "40%",
    minHeight: "70vh",
    margin: "auto",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export const signInStyles = {
  display: "flex",
  flexDirection: "column",
  height: "60vh",
  justifyContent: "space-between",
  margin: "30px",
};

export const signUpStyles = {
  display: "flex",
  flexDirection: "column",
  margin: "30px",
};

export const formStyles = {
  justifyContent: "space-between",
  margin: "30px",
};
