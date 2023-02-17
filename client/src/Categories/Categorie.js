import React, { useState } from 'react';
import { deleteCategorie } from '../redux/reducers/categories';
import './Categorie.css';


function Categorie(props) {


  function handleCategorieChange() {
    let cat = {
      id : props.id,
      title: props.nom
    }
    props.onChange(cat);
  }
  
  function deleteCategorie() {
    props.delete(props.id);
  }

  const user = JSON.parse(localStorage.getItem('userObject'));

  return (
    <div className="categorie flex flex-row px-10 pt-5 mb-10">

      <div className='categorieTitle'>{props.nom}</div>
      {(user.isAdmin) && (
      <div className='flex ml-auto mb-3 flex-col justify-center'>
        <div className='flex flex-row'>
          <img className='cursor-pointer' src="https://img.icons8.com/external-regular-kawalan-studio/24/c0c0c0/external-edit-user-interface-regular-kawalan-studio.png" onClick={() => {handleCategorieChange()}}/>
          <img className='cursor-pointer' src="https://img.icons8.com/material-rounded/24/c0c0c0/delete-trash.png" onClick={() => {deleteCategorie()}}/>
        </div>
      </div>)}

    </div>
  );
}

export default Categorie;
