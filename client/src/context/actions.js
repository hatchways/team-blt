import Cookies from 'js-cookie';

// Authentication actions used by the AuthReducer function in reducer.js

/*
The loginUser function's dispatch parameter takes an object that 
sets the action type for the AuthReducer function. The loginPayload
parameter is an object of the user's login credentials. 
 */
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch('/login', requestOptions);

    if (response.ok) {
      const email = loginPayload.email;
      const token = Cookies.get(email);
      dispatch({ type: 'LOGIN_SUCCESS', payload: {'email':email, 'token': token}});
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('login', true);

      console.log(email + ' is login!')
      return {'email':email, 'token': token}
    }
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

/*
The logout function's dispatch parameter sets the action type to 'LOGOUT'.
The user's authentication credentials are then removed from the local
storage. 
*/
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  localStorage.removeItem('login');
}
