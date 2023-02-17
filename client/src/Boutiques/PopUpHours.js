import React, { useState } from 'react';
import { Multiselect } from "multiselect-react-dropdown";
import './PopUpHours.css';


function PopUpHours(props) {

  
  const [selectedStoreHours, setSelectedStoreHours] = useState(props.selectedHours);

  const handleChange = (index1, index2, type, event) => {
      let newHours = [...selectedStoreHours];
      // console.log(newHours)
      type === 'work' ? (
        newHours[index1].work = !newHours[index1].work
      ) : (
        newHours[index1].periods[index2][type] = event.target.value
      )
      setSelectedStoreHours(newHours);
      // console.log(selectedStoreHours)
  }

  function action() {
    props.hoursChange(selectedStoreHours);
    props.secondButton();
  }

  function handleShowHours() {
    props.firstButton();
  }

  // "opening_hours": [
  //   {
  //       "day": "Lundi",
  //       "periods": [
  //           {
  //               "start": "2022-12-25T19:54:28.000Z",
  //               "end": "2022-12-25T19:54:28.000Z",
  //               "_id": "63ab62148aa60038c715fa65"
  //           },
  //           {
  //               "start": "2022-12-25T19:54:28.000Z",
  //               "end": "2022-12-25T19:54:28.000Z",
  //               "_id": "63ab62148aa60038c715fa66"
  //           }
  //       ],
  //       "_id": "63ab62148aa60038c715fa64"
  //   },
  //    {
    //       "day": "Lundi",
    //       "periods": [
    //           {
    //               "start": "2022-12-25T19:54:28.000Z",
    //               "end": "2022-12-25T19:54:28.000Z",
    //               "_id": "63ab62148aa60038c715fa65"
    //           },
    //           {
    //               "start": "2022-12-25T19:54:28.000Z",
    //               "end": "2022-12-25T19:54:28.000Z",
    //               "_id": "63ab62148aa60038c715fa66"
    //           }
    //       ],
    //       "_id": "63ab62148aa60038c715fa64"
    //   }
  // ],


  return (
    <div className='showHours'>
      <div className='flex flex-col h-full items-center justify-center'>

        {selectedStoreHours.map(
          (day, index1) => (
        <div className='flex justify-center items-center mb-5'>
          <div className='titleInput mr-10 w-20'>{selectedStoreHours[index1].day}</div>
          <div>
            <input
              id="4"
              onChange={(e) => handleChange(index1, 0, 'start', e)}
              value={selectedStoreHours[index1].periods[0].start}
              type="time"
              className='inputHours pl-5 mr-4'
            />
            <input
              id="4"
              onChange={(e) => handleChange(index1, 0, 'end', e)}
              value={selectedStoreHours[index1].periods[0].end}
              type="time"
              className='inputHours pl-5 mr-10'
            />
          </div>
          <div>
            <input
              id="4"
              onChange={(e) => handleChange(index1, 1, 'start', e)}
              value={selectedStoreHours[index1].periods[1].start}
              type="time"
              className='inputHours pl-5 mr-4'
            />
            <input
              id="4"
              onChange={(e) => handleChange(index1, 1, 'end', e)}
              value={selectedStoreHours[index1].periods[1].end}
              type="time"
              className='inputHours pl-5 mr-10'
            />
          </div>
          <input
            type="checkbox"
            checked={selectedStoreHours[index1].work}
            onChange={(e) => handleChange(index1, 1, 'work', e)}
            className='checkbox'
          />
        </div>
          )
        )}
        
        

        <div className='flex flex-row mt-5'>
          <button className='grayButton mr-5' onClick={handleShowHours}>Annuler</button>
          <button className='greenButton' onClick={action}>{props.action}</button>
        </div>

      </div>
   </div>
  );
}

export default PopUpHours;
