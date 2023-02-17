import React, { useState } from 'react';
import './ProduitsListe.css';
import right from './../img/right.png';
import left from './../img/left.png';
import Produit from './Produit';


function ProduitsListe(props) {


  const [currentItems, setCurrentItems] = useState(0);
  
  function handleProductChange(newValue) {
    props.onChange(newValue);
  }
  const nextPage = () => {
    if (props.produits.length > currentItems+6) setCurrentItems(currentItems+6);
  }
  
  const previousPage = () => {
    if (currentItems !== 0) setCurrentItems(currentItems-6);
  }

  const list = []

  for(let i = currentItems ; i < (currentItems+6) ; i++){
    list.push(props.produits[i] ? (<Produit key={props.produits[i]._id} id={props.produits[i]._id}  nom={props.produits[i].title} description={props.produits[i].description} prix={props.produits[i].price} categories={props.produits[i].categories} lang={props.lang} delete={props.delete} onChange={handleProductChange} />) : (<div  key={i} className='emptyProduit mb-5'></div>))
  }

  return (
    <div>
        <div className="grid grid-cols-3">
        {list}
        </div>
        <div className='flex justify-center'>
          <img alt='previous' src={left} className={'mr-6 cursor-pointer' + (currentItems !== 0 ? '' : 'pointer-events-none opacity-50')} onClick={previousPage}/>
          <img alt='next' src={right} className={(props.produits.length > currentItems+6 ? 'cursor-pointer' : 'pointer-events-none opacity-50')} onClick={nextPage}/>
        </div>
    </div>
  );
}

export default ProduitsListe;
