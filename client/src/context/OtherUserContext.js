import React, { useReducer, createContext } from 'react'

export const OtherUserProvider = createContext();

const initialOtherUser = {
    id: "",
    name: "",
    email: "",
    list_of_products: [],
    profile_pic: ""
}

function reducer(initialOtherUser, action) {
    switch(action.type) {
        case 'GET_USER':
            return {
                ...initialOtherUser,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                profile_pic: action.payload.profile_pic
            }
        case 'GET_LIST_OF_PRODUCTS':
            return {
                ...initialOtherUser,
                list_of_products: action.payload.list_of_products
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

function OtherUserContext({ children }) {
    const [otherUser, dispatch] = useReducer(reducer, initialOtherUser)
    const otherUserContexts = {
        otherUser: otherUser,
        dispatch: dispatch
    }

    return (
        <OtherUserProvider.Provider value={otherUserContexts}>
            { children }
        </OtherUserProvider.Provider>
    )
}

export default OtherUserContext
