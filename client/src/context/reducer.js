let email = localStorage.getItem('email')
	? JSON.parse(localStorage.getItem('email'))
	: '';
let token = localStorage.getItem('token')
	? JSON.parse(localStorage.getItem('token'))
	: '';
let login = localStorage.getItem('login')
	? JSON.parse(localStorage.getItem('login'))
	: false;
let profile_pic = localStorage.getItem('profile_pic')
	? JSON.parse(localStorage.getItem('profile_pic'))
	: '';
let list_of_products = localStorage.getItem('list_of_products')
	? JSON.parse(localStorage.getItem('list_of_products'))
	: [];
	
export const initialState = {
	email: email,
	token: token,
	profile_pic: profile_pic,
	list_of_products: list_of_products,
	login: login,
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
		
		case 'UPDATE_PROFILE_PIC':
			return {
				...initialState,
				profile_pic: action.payload.profile_pic
			};

		case 'UPDATE_PRODUCTS_LISTS':
			return {
				...initialState,
				list_of_products: [...action.payload.list_of_products]
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
