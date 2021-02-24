import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from './pages/SignIn';
import LandingPage from './pages/Landing';
import { useAuthState, useAuthDispatch } from './context';

const ProtectedRoutes = ({component: Component, path,}) => {
	const currentUser = useAuthState();
  return (
		<Route
			path={path}
			render={(props) => {
				if (!Boolean(currentUser.token)) {
					return <Redirect to={{ pathname:'/login' }} />;
				} else {
          return <Component {...props} />;
        }
			}}
		/>
	);
};

export default ProtectedRoutes;
