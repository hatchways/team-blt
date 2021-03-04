import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { useAuthState } from '../../../context/context';
import { OtherUserProvider } from '../../../context/OtherUserContext';
import Navbar from '../../header/Navbar'
import ListsContainer from '../ListsContainer';
import OtherUserProfile from './OtherUserProfile';

function OtherUserDashboard(props) {
    // The id parameter will be set to the otherUserId which will then be used to fetch the other user's user model from the server.
    const otherUserId = props.match.params.id;
    const {otherUser, dispatch} = useContext(OtherUserProvider)
    const currentUser = useAuthState();
    
    // Fetching the other user's data
    async function fetchOtherUser() {
        const response = await fetch(`/users/${otherUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify(),
        })
        try {
            const user = await response.json(); 
            dispatch({ type: "GET_USER", payload: {...user, "id": otherUserId}})  
        }             
        catch (error) {
            // Redirect back to the user dashboard if there's an error.
            return props.history.push('/');
        }                 
    }

    // Fetching the other user's lists
    async function fetchOtherUserLists() {
        const response = await fetch(`/users/${otherUserId}/lists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`
            },
            body: JSON.stringify(),
        })
        try {
            const lists = await response.json();
            dispatch({ type: "GET_LIST_OF_PRODUCTS", payload: {"list_of_products": lists}});
        }
        catch(error) {
            console.log(error)
        }
    }

    // On arrival to the friend dashboard, make a GET request with the endpoing /users/:id and save the user model to a state
    useEffect(() => {
        fetchOtherUser();
        fetchOtherUserLists();
    }, [otherUserId])

    /* 
    If the current user visits their own page via the endpoint, /users/<their own id>, 
    redirect the user back to their personal dashboard.
    */
    if (currentUser.email == otherUser.email) {
        return <Redirect exact to='/' />
    }


    return (
        <>
            <Navbar />
            <OtherUserProfile
                image={otherUser.profile_pic}
                name={otherUser.name}
                email={otherUser.email}
            />
            <ListsContainer otherUser={otherUser} />
        </>
    )
}

export default OtherUserDashboard
