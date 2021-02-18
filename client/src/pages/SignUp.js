import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { formStyles, modalStyles, signUpStyles } from "../themes/theme";

Modal.setAppElement("#root");

function SignUp() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <Modal isOpen={modalIsOpen} style={modalStyles}>
      <div className="signUp" style={signUpStyles}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validate={(values) => {
            const errors = {};

            //Check for name input
            if (!values.name) {
              errors.name = "Required";
            }
            //Check for email input
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            //Check for password input
            if (values.password.length < 6) {
              errors.password = "Password must be greater than 6 characters.";
            }
            //Check if password confirmation is the same as password input
            if (values.passwordConfirm !== values.password) {
              errors.passwordConfirm = "Passwords do not match.";
            }
            return errors;
          }}

          onSubmit={async (values) => {
            const response = await fetch("/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(values)
            });
            console.log(values);
            if (response.ok) {
              console.log("response worked!");
            }
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <>
              <Typography variant="h4">Sign Up</Typography>
              <Form style={formStyles} required>
                <Typography variant="h6">Your name:</Typography>
                <Field
                  component={TextField}
                  name="name"
                  type="name"
                  placeholder="Name"
                  variant="outlined"
                />

                <Typography variant="h6">Your e-mail address:</Typography>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  variant="outlined"
                />

                <Typography variant="h6">Password:</Typography>
                <Field
                  component={TextField}
                  name="password"
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                />

                <Typography variant="h6">Retype your password:</Typography>
                <Field
                  component={TextField}
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  color="primary"
                  style={{
                    width: '300px',
                    margin: 'auto',
                    marginBottom: '50px'
                  }}
                >
                  CREATE ACCOUNT
                </Button>
              </Form>
            </>
          )}
        </Formik>
        <div className="signUp__footer">
          Already a member?{" "}
          <Link
            to={{
              pathname: "/login",
              state: { modal: true },
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default SignUp;
