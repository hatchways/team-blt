import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { formStyles, modalStyles, signInStyles } from "../themes/theme";
import Cookies from 'js-cookie';
import {loginUser} from '../actions';
import {useAuthState, useAuthDispatch} from '../context/context';

Modal.setAppElement("#root");

function Login({ history }) {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const dispatch = useAuthDispatch();
  const { login, errorMessage } = useAuthState();

  return (
    <Modal isOpen={modalIsOpen} style={modalStyles}>
      <div className="login" style={signInStyles}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            //Check for email input
            if (!values.email) {
              errors.email = "Please enter your e-mail.";
            }
            //Check for password input
            if (!values.password) {
              errors.password = "Please enter your password.";
            }
            return errors;
          }}
          onSubmit={
            async(values) => {
              try{
                console.log(values)
                let response = await loginUser(dispatch, values)
                return history.push('/')
              } catch (error) {
                console.log(error)
              }
            }
          }
        >
          {({ submitForm, isSubmitting }) => (
            <>
              <Typography variant="h4">Sign in</Typography>
              <Form style={formStyles} required>
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
                  component= {TextField}
                  name="password"
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                />

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  color="primary"
                  style={{
                    width: "150px",
                    margin: "auto",
                    marginBottom: "50px",
                  }}
                >
                  Sign In
                </Button>
              </Form>
            </>
          )}
        </Formik>

        <div className="signIn__footer">
          Don't have an account?{" "}
          <Link
            to={{
              pathname: "/signup",
              state: { modal: true },
            }}
          >
            Create an Account
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default Login;
