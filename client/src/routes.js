import React from 'react';
import Login from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/Landing';

const routes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/',
		component: LandingPage,
	},
  {
    path: '/signup',
    component: SignUp,
  },
];

export default routes;
