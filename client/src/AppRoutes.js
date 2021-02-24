import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState, useAuthDispatch } from './context';

const AppRoutes = ({ component: Component, path, ...rest }) => {
	const currentUser = useAuthState();

  console.log(currentUser);
  console.log(useAuthDispatch());
  return (
		<Route
			path={path}
			render={(props) =>
				!Boolean(currentUser.token) ? (
					<Redirect to={{ pathname: '/login' }} />
				) : (
					<Component {...props} />
				)
			}
			{...rest}
		/>
	);
};

export default AppRoutes;
