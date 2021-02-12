import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { formStyles, modalStyles, signUpStyles } from "../themes/theme";

Modal.setAppElement("#root");

function SignUp() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    passwordTwo: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    passwordTwo: "",
  });

  // Handle text input
  function handleChange(event) {
    const field = event.target.name;
    const tempUser = user;

    // Reset error messages
    const err = error;
    const errorText = errorMessage;
    err[field] = false;
    errorText[field] = "";

    // Check if we're entering in the password 2 field
    if (field === "passwordTwo") {
      setPasswordTwo(event.target.value);
    } else {
      tempUser[field] = event.target.value;
      setUser({ ...tempUser });
    }

    setError({ ...err });
    setErrorMessage({ ...errorText });
  }

  // On submit, check the sign-up form's criteria.
  function onSubmit(event) {
    // Check for a name
    if (user.name === "") {
      let err = error;
      err.name = true;
      let errorText = errorMessage;
      errorText.name = "Please enter your name.";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    } else {
      let err = error;
      err.name = false;
      let errorText = errorMessage;
      errorText.name = "";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    }

    // Check for a valid email
    if (!validateEmail(user.email)) {
      let err = error;
      err.email = true;
      let errorText = errorMessage;
      errorText.email = "Please enter a valid e-mail.";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    } else {
      let err = error;
      err.email = false;
      let errorText = errorMessage;
      errorText.email = "";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    }

    // Check for a password that is greater than 6 characters in length
    if (user.password.length < 6) {
      let err = error;
      error.password = true;
      let errorText = errorMessage;
      errorText.password = "Passwords must be greater than 6 characters long.";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    } else {
      let err = error;
      err.password = false;
      let errorText = errorMessage;
      errorText.password = "";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    }
    // Check that the second password is the same as the first password
    if (passwordTwo !== user.password) {
      let err = error;
      err.passwordTwo = true;
      let errorText = errorMessage;
      errorText.passwordTwo = "The passwords do not match.";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    } else {
      let err = error;
      err.passwordTwo = false;
      let errorText = errorMessage;
      errorText.passwordTwo = "";

      setError({ ...err });
      setErrorMessage({ ...errorText });
    }

    // If everything is valid, link back to the sign in page
    // If any one of the textfields has an error, prevents submission.
    if (error.name || error.email || error.password || error.passwordTwo) {
      event.preventDefault();
    }
  }

  // Validating email function
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <Modal isOpen={modalIsOpen} style={modalStyles}>
      <div className="signUp" style={signUpStyles}>
        <Typography variant="h4">Sign Up</Typography>

        <form className="signUp__input" style={formStyles} required>
          <Typography variant="h6">Your name:</Typography>
          <TextField
            name="name"
            input="text"
            placeholder="Name"
            onChange={handleChange}
            value={user.name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            error={error.name}
            helperText={errorMessage.name}
          />

          <Typography variant="h6">Your e-mail address:</Typography>
          <TextField
            input="text"
            placeholder="E-mail"
            onChange={handleChange}
            value={user.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            error={error.email}
            helperText={errorMessage.email}
          />

          <Typography variant="h6">Password:</Typography>
          <TextField
            input="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            type="password"
            id="password"
            inputProps={{
              minLength: 6,
            }}
            required
            error={error.password}
            helperText={errorMessage.password}
          />

          <Typography variant="h6">Retype your password:</Typography>
          <TextField
            input="password"
            placeholder="Retype your password"
            onChange={handleChange}
            value={passwordTwo}
            variant="outlined"
            margin="normal"
            fullWidth
            name="passwordTwo"
            type="password"
            id="password2"
            inputProps={{
              minLength: 6,
            }}
            required
            error={error.passwordTwo}
            helperText={errorMessage.passwordTwo}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={onSubmit}
            color="primary"
          >
            CREATE ACCOUNT
          </Button>
        </form>

        <div className="signUp__footer">
          Already a member?{" "}
          <Link to={{
              pathname: '/sign-in',
              state: { modal: true }
          }}>
            Sign In
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default SignUp;
