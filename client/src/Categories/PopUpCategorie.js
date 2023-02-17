import React, { useState } from 'react';
import './PopUpCategorie.css';


function PopUpCategorie(props) {

  
  const [selectedInputCat, setSelectedInputCat] = useState(props.selectedInputCat);

  function handleInputCatChange(event) {
    setSelectedInputCat(event.target.value);
    props.inputChange(event.target.value);
  }

  function action() {
    props.secondButton();
  }

  function handleShowCategorie() {
    props.inputChange("");
    props.firstButton(0);
  }

  return (
    <div className='showCategorie'>
      <div className='flex flex-col h-full items-center justify-center'>
        <div>
          <div className='titleInput mb-3'>Nom :</div>
          <input
            id="4"
            onChange={handleInputCatChange}
            value={selectedInputCat}
            type="text"
            className='inputCat pl-5 mb-12'
          />
        </div>
        <div className='flex flex-row'>
          <button className='grayButton mr-5' onClick={handleShowCategorie}>Annuler</button>
          <button className='greenButton' onClick={action}>{props.action}</button>
        </div>
      </div>
   </div>
  );
}

export default PopUpCategorie;
