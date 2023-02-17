import React, { useState } from 'react';
import './CategoriesListe.css';
import right from './../img/right.png';
import left from './../img/left.png';
import Categorie from './Categorie';


function CategoriesListe(props) {


  const [currentItems, setCurrentItems] = useState(0);

  function handleCategorieChange(newValue) {
    props.onChange(newValue);
  }
  
  const nextPage = () => {
    if (props.categories.length > currentItems+12) setCurrentItems(currentItems+12);
  }
  
  const previousPage = () => {
    if (currentItems !== 0) setCurrentItems(currentItems-12);
  }

  const list = []

  for(let i = currentItems ; i < (currentItems+12) ; i++){
    list.push(props.categories[i] ? (<Categorie key={props.categories[i]._id} id={props.categories[i]._id}  nom={props.categories[i].title} onChange={handleCategorieChange} delete={props.delete} />) : (<div  key={i} className='emptyCategorie mb-10'></div>))
  }

  return (
    <div>
        <div className="grid grid-cols-3">
        {list}
        </div>
        <div className='flex justify-center'>
          <img alt='previous' src={left} className={'mr-6 cursor-pointer' + (currentItems !== 0 ? '' : 'pointer-events-none opacity-50')} onClick={previousPage}/>
          <img alt='next' src={right} className={(props.categories.length > currentItems+12 ? 'cursor-pointer' : 'pointer-events-none opacity-50')} onClick={nextPage}/>
        </div>
    </div>
  );
}

export default CategoriesListe;
