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
      // email fetched from user's email input in the log in form
      const email = loginPayload.email;
      const token = Cookies.get(email);
      // Fetch the profile picture URL and the user's list of lists of products from the server
      async function fetchUserData() {
        const response = await fetch(`/user`, {
          method: "GET",
          headers: {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(),
        });
        const user = await response.json();

        // Set the dispatch type to UPDATE_PROFILE_PIC and update the profile_pic value of the intialState object in reducer.js
        dispatch({ type: 'UPDATE_PROFILE_PIC', payload: {'profile_pic': user.profile_pic}});
        localStorage.setItem('profile_pic', JSON.stringify(user.profile_pic));
        // Set the dispatch typ to UPDATE_PRODUCTS_LISTS and update the list_of_products value of the initial state objecti n reducer.js
        dispatch({ type: 'UPDATE_PRODUCTS_LISTS', payload: {'list_of_products': user.list_of_products}});
        localStorage.setItem('list_of_products', JSON.stringify(user.list_of_products));
      };
      // Call the fetchData() function to fetch the user's data
      fetchData()

      // Set the dispatch type to LOGIN_SUCCESS and update the email and token of the initialState object in reducer.js
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
  localStorage.removeItem('profile_pic');
  localStorage.removeItem('list_of_products');
  localStorage.removeItem('friends');

}

export async function getFriends(dispatch, token) {
  async function fetchData() {
    const response = await fetch(`/friends`, {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    });
    const user = await response.json();
    console.log(user)

    dispatch({ type: 'UPDATE_FRIENDS', payload: {'friends': user.friends}});
    localStorage.setItem('friends', JSON.stringify(user.friends));

  };
  fetchData();

}

export async function followFriends(dispatch, token, friend) {
  async function fetchData() {
    const data = {
      friends: friend
    }

    const response = await fetch(`/friends`, {
      method: "PUT",
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const user = await response.json();
    console.log(user);

    dispatch({ type: 'UPDATE_FRIENDS', payload: {'friends': user.friends}});
    localStorage.setItem('friends', JSON.stringify(user.friends));

  };
  fetchData();


}

export async function unfollowFriends(dispatch, token, friend) {
  async function fetchData() {
    const data = {
      friends: friend
    }

    const response = await fetch(`/friends`, {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const user = await response.json();
    console.log(user);

    dispatch({ type: 'UPDATE_FRIENDS', payload: {'friends': user.friends}});
    localStorage.setItem('friends', JSON.stringify(user.friends));

  };
  fetchData();

}


/*
The updateProfilPic function's dispatch parameter sets the action type to
'UPDATE_PROFILE_PIC'. The updated image url from UserSetting.js will then
be the new value for the profile_pic attribute of the user object.
*/
export async function updateProfilePic(dispatch, imageUrl) {
  dispatch({ type: 'UPDATE_PROFILE_PIC', payload: { 'profile_pic': imageUrl }});
};

/*
The updateProductsLists function's dispatch parameter sets the action type
to 'UPDATE_PRODUCTS_LISTS'. When the user adds a new list, the list_of_products
attribute's list will be updated to include the new list.
*/
export async function updateProductsLists(dispatch, newList) {
  dispatch({ type: 'UPDATE_PRODUCTS_LISTS', payload: newList})
}
