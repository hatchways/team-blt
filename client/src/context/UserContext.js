import React, { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserModel = createContext();

function UserContext({ children }) {
    const [imageUrl, setImageUrl] = useState('');
    const userEmail = Object.keys(Cookies.get());
    const imageContextValues = {
        imageUrl: imageUrl,
        setImageUrl: setImageUrl
    }
  
    /* 
    The image URL for the profile pic will be fetched from the
    backend flask server on the first render. The URL will then 
    be saved into the imageUrl state in the client. Any future
    changes to the image URL will be saved to the imageUrl state
    in the client without the need to fetch from the server again.
    However, the UserSetting.js file has code for sending any new 
    image URL to the server and setting the imageUrl state in the 
    client.
    */
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`/users/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${Cookies.get(userEmail)}`,
          },
          body: JSON.stringify(),
        });
        const user = await response.json(); 
        console.log(user)
        setImageUrl(user.profile_pic)
      }
      // Run only if the user is logged in
      if (userEmail) {
        fetchData();
      }   
    }, []);
    console.log(imageUrl)

    return (
        <UserModel.Provider value={imageContextValues}>
            {children}
        </UserModel.Provider>
    )
}

export default UserContext
