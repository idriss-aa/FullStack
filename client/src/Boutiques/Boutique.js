import React, { useState } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './Boutique.css';


function Boutique(props) {

  function handleStoreChange() {
    let store = {
      id : props.id,
      title : props.nom,
      isOpen : props.status,
      opening_hours : props.hours,
      date : props.date,
    }

    props.onChange(store);
  }
  
  const formated = moment(props.date).format('DD MMM, YYYY');

  function deleteStore() {
    props.delete(props.id);
  }

  const user = JSON.parse(localStorage.getItem('userObject'));

  return (
    <div className="boutique flex flex-col px-10 pt-5 mb-5">

      <div className='flex flex-row'>

        <div className='storeTitle'>{props.nom}</div>

        <div className='flex flex-col ml-auto mt-5'>
          <div className='title3'>{props.status ? "Ouvert" : "En congé"}</div>
          <div className='title3 pt-5'>{formated}</div>
        </div>

     </div>

     <div className='flex flex-row'>

        <div className='flex flex-col'>
          <div className='title4'>Produits</div>
          <div className='number'>{props.nbProduit}</div>
        </div>

        <div className='flex flex-col ml-10'>
          <div className='title4'>Catégories</div>
          <div className='number'>{props.nbCategorie}</div>
        </div>

        <div className='ml-auto mt-10 flex flex-row justify-center'>
          <Link to={`/produits/${props.id}`}>
            <button className='storeButton'>Ouvrir</button>
          </Link>
          {(user.isAdmin || user.isVendorDeliveryMan) && (<button className='ml-5 storeButton' onClick={() => {handleStoreChange()}}>Consulter</button>)}
          {(user.isAdmin || user.isVendorDeliveryMan) && (<div>
            <img className='ml-5 cursor-pointer' src="https://img.icons8.com/material-rounded/24/c0c0c0/delete-trash.png" onClick={() => {deleteStore()}}/>
          </div>)}
        </div>

     </div>
    </div>
  );
}

export default Boutique;
