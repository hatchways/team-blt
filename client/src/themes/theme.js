import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import LandingPage from "../pages/Landing";

export const theme = createMuiTheme({
  pallet: {
    primary: { 
      main: green[500] 
    }
  }
});

export const modalStyles = {
  overlay: {
    background: 'rgba(36,39,60, 0.5)',
  },
  content: {
    width: '40%',
    height: '70%',
    margin: 'auto',
    borderRadius: '5px'
  }
}