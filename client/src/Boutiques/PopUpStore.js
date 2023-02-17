import React, { useState } from 'react';
import { Multiselect } from "multiselect-react-dropdown";
import './PopUpStore.css';
import moment from 'moment';
import PopUpHours from './PopUpHours';


function PopUpStore(props) {

  
  const [selectedStoreName, setSelectedStoreName] = useState(props.selectedName);
  const [selectedStoreStatus, setSelectedStoreStatus] = useState(props.selectedStatus);
  const [selectedStoreHours, setSelectedStoreHours] = useState(props.selectedHours);
  const [showHours, setShowHours] = useState(0);

  function handleStoreNameChange(event) {
    setSelectedStoreName(event.target.value);
    props.nameChange(event.target.value);
  }

  function handleStoreStatusChange(event) {
    setSelectedStoreStatus(event.target.value === 'true');
    props.statusChange(event.target.value === 'true');
  }

  function handleStoreHoursChange(value) {
    setSelectedStoreHours(value);
    props.hoursChange(value);
  }

  function action() {
    props.secondButton();
  }

  function handleShowStore() {
    props.nameChange("");
    props.statusChange("");
    props.hoursChange([
      {
          "day": "Lundi",
          "periods": [
            {
                start: "00:00",
                end: "00:00"
            },
            {
              start: "00:00",
              end: "00:00"
            }
          ],
          "work" : false
      },
      {
        "day": "Mardi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
          ],
          "work" : false
      },
      {
        "day": "Mercredi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
          ],
          "work" : false
      },
      {
        "day": "Jeudi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
          ],
          "work" : false
      },
      {
        "day": "Vendredi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
          ],
          "work" : false
      },
      {
        "day": "Samedi",
        "periods": [
          {
              start: "00:00",
              end: "00:00"
          },
          {
            start: "00:00",
            end: "00:00"
          }
          ],
          "work" : false
      },
      {
        "day": "Dimanche",
        "periods": [
            {
                start: "00:00",
                end: "00:00"
            },
            {
              start: "00:00",
              end: "00:00"
            }
          ],
          "work" : true
      }
    ]);
    props.firstButton(0);
  }

  function handleShowHours() {
    setShowHours(0);
  }
  
  const formated = moment(props.date).format('DD MMM, YYYY');

  return (
    showHours === 0 ? (<div className='showStore'>
      <div className='flex flex-col h-full items-center justify-center'>

        <div className='widthBox'>
          {props.date && (<div className='title3 mb-8'>Crée le {formated}</div>)}
        </div>

        <div className='flex flex-row mb-5'>
          <div>
            <div className='titleInput mb-3'>Nom :</div>
            <input
              id="4"
              onChange={handleStoreNameChange}
              value={selectedStoreName}
              type="text"
              className='inputStoreName pl-5 mb-5 mr-5'
            />
          </div>
          <div>
            <div className='titleInput mb-3'>Statut :</div>
            <select onChange={handleStoreStatusChange} value={selectedStoreStatus} className="inputStoreName">
              <option value={false}>En congé</option>
              <option value={true}>Ouvert</option>
            </select>
          </div>
        </div>

        <div className='widthBox'>
          <div className='titleInput underline cursor-pointer mb-12' onClick={() => {setShowHours(1)}}>Définir les horaires d’ouverture</div>
        </div>
        

        <div className='flex flex-row'>
          <button className='grayButton mr-5' onClick={handleShowStore}>Annuler</button>
          <button className='greenButton' onClick={action}>{props.action}</button>
        </div>

      </div>
   </div>) :
   (<PopUpHours selectedHours={selectedStoreHours} hoursChange={handleStoreHoursChange} firstButton={handleShowHours} secondButton={handleShowHours} action="Valider" />)
  );
}

export default PopUpStore;
