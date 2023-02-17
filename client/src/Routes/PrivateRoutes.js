import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { validateToken } from '../Services/Api';


const PrivateRoute = (props) => {
	// // const token = useSelector(state => state.token.token);
    // const dispatch = useDispatch();
    // const {tokenIsValid} = useSelector(state => state.token);
	// const [token, setToken] = useState();
	// const [isValid, setIsValid] = useState(false);

	// JSON.parse(localStorage.getItem("user"));
	const token = JSON.parse(localStorage.getItem("user"));
	// useEffect(() => {
		
	// 	async function checkToken() {
	// 	  const valid = await validateToken(token);
	// 	  console.log("yo " + valid)
	// 	  setIsValid(valid);
	// 	}
	// 	token && (
	// 	checkToken()
	// 	);
	// 	console.log(isValid)
	//   });


	return token ? (
		<Route path={props.path} exact={props.exact} component={props.component} />
	) : (
		<Redirect to='/' />
	);
};
export default PrivateRoute;