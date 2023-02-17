import React, { useState } from 'react';
import './Login.css';
import logo from './../img/avocado.png';
import { useDispatch } from 'react-redux';
import { postLogin } from '../redux/reducers/useSlice';
import {Toaster} from 'react-hot-toast';


function Login(props) {

  function handleEmailChange(e) {
    setUser({...user, username : e.target.value});
  }

  function handlePasswordChange(e) {
    setUser({...user, password : e.target.value});
  }

  const dispatch = useDispatch();
  
  const [user,setUser]=useState({
    username : "",
    password : ""
  });

    const SubmitForm = (e) => {
        e.preventDefault();
        dispatch(postLogin(user))
    };

  return (
    <div>
        <div><Toaster/></div>
        <div className="login flex flex-col items-center">

            <img className='mt-10' alt='logo' src={logo}/>
            
            <div className='bienvenue mt-5 mb-10'>Bienvenue sur Avocommerce</div>
            
            <div>
                <div className='titleLogin mb-3'>Email :</div>
                <input
                id="4"
                onChange={handleEmailChange}
                value={user.username}
                type="text"
                className='inputLogin pl-5 mb-8'
                />
            </div>
            
            <div>
                <div className='titleLogin mb-3'>Mot de passe :</div>
                <input
                id="4"
                onChange={handlePasswordChange}
                value={user.password}
                type="password"
                className='inputLogin pl-5 mb-10'
                />
            </div>

            <button className='buttonLogin' onClick={SubmitForm}>Se connecter</button>

        </div>
    </div>
  );
}

export default Login;
