import React, { useReducer } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

/* 
useAuthState is a function that uses the AuthStateContext's value, 
the user object, and saves the user object into a variable where it
is returned and exported for use in other files.
*/
export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}
	return context;
}

/* 
useAuthDispatch is a function that uses the AuthDispatchContext's value, 
the dispatch function, and saves the dispatch function into a variable
where it is returned and exported for use in other files for user 
authentication.
*/
export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}
	return context;
}

/* 
This is the context provider where AuthStateContext provides the user state to 
its children and AuthDispatchContext provides the dispatch function that 
authenticates the user.

The AuthReducer function is found in the reducer.js file. It is saved as 
dispatch and then used as the value of the AuthDispatchContext. The 
initialState is an object found in the reducer.js file. The initialState
is saved as the user state. All updates to the initialState by AuthReducer 
is saved to user. user is used as the value of the AuthStateContext.
*/
export const AuthProvider = ({ children }) => {
	/* 
	user = {
		email: "user's email"
		token: "the authentication token"
		profile_pic: "profile picture URL"
		list_of_products: [a list of the user's created lists of products],
		login: boolean,
		errorMessage: null
	}
	*/
	const [user, dispatch] = useReducer(AuthReducer, initialState);
	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};
