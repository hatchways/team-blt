import React, { useState, useReducer } from 'react';

let email = localStorage.getItem('email')
	? JSON.parse(localStorage.getItem('email'))
	: '';
let token = localStorage.getItem('token')
	? JSON.parse(localStorage.getItem('token'))
	: '';

export const initialState = {
	user: '' || email,
	token: '' || token,
	login: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
        login: true,
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
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
