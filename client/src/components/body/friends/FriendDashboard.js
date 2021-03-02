import React from 'react'
import Navbar from '../../header/Navbar'
import FriendProfile from './FriendProfile'
import FriendShoppingList from './FriendShoppingList'

function FriendDashboard() {
    return (
        <>
            <Navbar />
            <FriendProfile />
            <FriendShoppingList />
        </>
    )
}

export default FriendDashboard
