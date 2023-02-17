import React, { useState } from 'react';
import './Produit.css';


function Produit(props) {

  function handleProductChange() {
    let product = {
      id : props.id,
      title : props.nom,
      description : props.description,
      price : props.prix,
      categories : props.categories,
    }
    props.onChange(product);
  }

  function deleteProduct() {
    props.delete(props.id);
  }

  const user = JSON.parse(localStorage.getItem('userObject'));
  
  return (
    <div className="produit flex flex-col px-10 pt-5 mb-5">

      {props.nom && (<div className='storeTitle'>{props.lang === "fr" ? props.nom.fr : props.nom.en}</div>)}


      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <div className='title4'>Prix</div>
          <div className='number'>{props.prix} $</div>
        </div>
        {(user.isAdmin || user.isVendorDeliveryMan) && (
        <div className='flex ml-auto mb-3 flex-col justify-end'>
          <div className='flex flex-row'>
            <img className='cursor-pointer' src="https://img.icons8.com/external-regular-kawalan-studio/24/c0c0c0/external-edit-user-interface-regular-kawalan-studio.png" onClick={() => {handleProductChange()}}/>
            <img className='cursor-pointer' src="https://img.icons8.com/material-rounded/24/c0c0c0/delete-trash.png" onClick={() => {deleteProduct()}}/>
          </div>
        </div>)}
      </div>
        

    </div>
  );
}

export default Produit;
