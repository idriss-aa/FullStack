import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './img/avocado.png';
import { useDispatch } from 'react-redux';
import { postLogout } from './redux/reducers/useSlice';

function Header() {

  const user = JSON.parse(localStorage.getItem('userObject'));

  const dispatch = useDispatch();

    const SubmitForm = () => {
        dispatch(postLogout())
    };
  return (
    <div className="header flex items-center pl-10">
      <div className='flex items-center'>
        <img alt='logo' src={logo}/>
        <div className='appName'>Avocommerce</div>
      </div>
      {user && (
      <div className='ml-auto flex items-center cursor-pointer' onClick={() => {SubmitForm()}}>
        <img src="https://img.icons8.com/ios-glyphs/30/FB6B63/logout-rounded-left.png"/>
        <div className='ml-2 mr-10 logout'>
          se déconnecter
        </div>
      </div>)}
    </div>
  );
}

export default Header;
