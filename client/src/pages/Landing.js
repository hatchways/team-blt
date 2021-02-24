import React from 'react'
import Button from "@material-ui/core/Button";
import Cookies from 'js-cookie';
import {useAuthState, useAuthDispatch} from '../context';
import {logout} from '../actions';

function LandingPage({history}) {
  const dispatch = useAuthDispatch()
  return (
      <div style={{backgroundColor: 'pink'}}>
        <h1>Welcome to the website!</h1>
        <Button
          variant="contained"
          color="primary"
          style={{
            width: '300px',
            margin: 'auto',
            marginBottom: '50px'
          }}
          onClick={async() => {
            const response = await fetch("/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookies.get(JSON.parse(localStorage.getItem('email')))
              },
            });
            
            if (response.status==422){
              console.log('already logout, please log in');
              history.push('/login');
            }

            if (response.ok) {
              console.log('logout successfully');
              logout(dispatch);
              history.push('/login');
            }
          }}
        >
          Logout
        </Button>
      </div>
  )
}

export default LandingPage
