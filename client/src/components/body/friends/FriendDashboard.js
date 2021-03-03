import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../../../context/context';
import UserDashboard from '../../../pages/UserDashboard';
import Navbar from '../../header/Navbar'
import FriendProfile from './FriendProfile'
import FriendShoppingListContainer from './FriendShoppingListContainer'


function FriendDashboard(props) {
    // The id parameter will be set to the friendId which will then be used to fetch the friend's user model from the server.
    const friendId = props.match.params.id;
    const [friend, setFriend] = useState({});
    const currentUser = useAuthState();

    // On arrival to the friend dashboard, make a GET request with the endpoing /users/:id and save the user model to a state
    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`/users/${friendId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify(),
            })
            try {
                const user = await response.json();
                setFriend(user);
            }             
            catch (error) {
                // Redirect back to the user dashboard if there's an error.
                return props.history.push('/');
            }                 
        }
        fetchUser();
    }, [])
    console.log(friend);
    console.log(friend.name)

    return (
        <>
            <Navbar />
            <FriendProfile
                image={friend.profile_pic}
                name={friend.name}
                email={friend.email}
            />
            <FriendShoppingListContainer />
        </>
    )
}

export default FriendDashboard
