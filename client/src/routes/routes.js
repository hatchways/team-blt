import React from 'react';
import Login from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const routes = [
	{
		path: '/login',
		component: Login,
	},
  {
    path: '/signup',
    component: SignUp,
  },
];

export default routes;
