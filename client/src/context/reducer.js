
let email = localStorage.getItem('email')
	? JSON.parse(localStorage.getItem('email'))
	: '';
let token = localStorage.getItem('token')
	? JSON.parse(localStorage.getItem('token'))
	: '';
let login = localStorage.getItem('login')
	? JSON.parse(localStorage.getItem('login'))
	: false;

export const initialState = {
	email: '' || email,
	token: '' || token,
	login: false || login,
	errorMessage: null,
};

/*
AuthReducer is a reducer function that takes in the initialState
object and an action. The initialState object is updated based on 
the action's case. The types of actions that are passed into this
function can be found in the action.js file. 
*/
export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
        login: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				email: action.payload.email,
				token: action.payload.token,
				login: true,
			};
		case 'LOGOUT':
			return {
				...initialState,
				email: '',
				token: '',
        login: false,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
