import React, { useState } from 'react';
import Boutique from './Boutique';
import './BoutiquesListe.css';
import right from './../img/right.png';
import left from './../img/left.png';


function BoutiquesListe(props) {


  const [currentItems, setCurrentItems] = useState(0);
  
  function handleStoreChange(newValue) {
    props.onChange(newValue);
  }

  const nextPage = () => {
    if (props.boutiques.length > currentItems+2) setCurrentItems(currentItems+2);
  }
  
  const previousPage = () => {
    if (currentItems !== 0) setCurrentItems(currentItems-2);
  }

  return (
    <div>
      
        {props.boutiques[currentItems] ? (<Boutique key={props.boutiques[currentItems]._id} id={props.boutiques[currentItems]._id}  nom={props.boutiques[currentItems].title} nbProduit={props.boutiques[currentItems].Nb_products} nbCategorie={props.boutiques[currentItems].Nb_Categories} status={props.boutiques[currentItems].isOpen} hours={props.boutiques[currentItems].opening_hours} date={props.boutiques[currentItems].createdAt} onChange={handleStoreChange} produits={props.boutiques[currentItems].products} delete={props.delete} />) : (<div className='emptyBoutique mb-5'></div>)}
        {props.boutiques[currentItems+1] ? (<Boutique key={props.boutiques[currentItems+1]._id} id={props.boutiques[currentItems+1]._id}  nom={props.boutiques[currentItems+1].title} nbProduit={props.boutiques[currentItems+1].Nb_products} nbCategorie={props.boutiques[currentItems+1].Nb_Categories} status={props.boutiques[currentItems+1].isOpen} date={props.boutiques[currentItems+1].createdAt} onChange={handleStoreChange} produits={props.boutiques[currentItems].produits} delete={props.delete} />) : (<div className='emptyBoutique mb-5'></div>)}
        
        <div className='flex justify-center'>
          <img alt='previous' src={left} className={'mr-6 cursor-pointer' + (currentItems !== 0 ? '' : 'pointer-events-none opacity-50')} onClick={previousPage}/>
          <img alt='next' src={right} className={(props.boutiques.length > currentItems+2 ? 'cursor-pointer' : 'pointer-events-none opacity-50')} onClick={nextPage}/>
        </div>
    </div>
  );
}

export default BoutiquesListe;
