import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteLinks = (props) => {

	const user = localStorage.getItem("user");

	return user ? (
		<Redirect to='/boutiques' />
	) : (
		<Route path={props.path} exact={props.exact} component={props.component} />
	);
};
export default RouteLinks;