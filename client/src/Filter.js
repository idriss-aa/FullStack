import React, { useState, useEffect } from 'react';
import './Filter.css';
import { RadioButton } from "./RadioButton";


function Filter(props) {

  const [params, setParams] = useState(props.params);
  const [selectedValue, setSelectedValue] = useState("tout");
  const [selectedBeforeDate, setSelectedBeforeDate] = useState("");
  const [selectedAfterDate, setSelectedAfterDate] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  const handleInputBeforeChange = (event) => {
    setSelectedBeforeDate(event.target.value);
  }

  const handleInputAfterChange = (event) => {
    setSelectedAfterDate(event.target.value);
  }

  const handleParamsChange = () => {
    let par = "";
    // console.log(selectedValue === "conge")
    selectedValue === "tout" ? (par = "") : (
      selectedValue === "conge" ? (par = "isOpen=false&") : (par = "isOpen=true&")
    )
    // console.log("he" + params)
  
    selectedAfterDate === "" ? (par = par) : (par = par + "dateFrom=" + selectedAfterDate + "&")
    
    selectedBeforeDate === "" ? (par = par) : (par = par + "dateTo=" + selectedBeforeDate + "&")

    // console.log(par)
    setParams(par);
  }

  useEffect(() => {
    handleParamsChange();
    props.onChange(params);
    // console.log(params);
  },[selectedValue,selectedAfterDate,selectedBeforeDate,params])

  return (
    <div className="filter flex flex-col pl-10 pt-10">
      
        <div className="flex flex-col">
          <RadioButton
            changed={handleChange}
            id="1"
            isSelected={selectedValue === "tout"}
            label="tout"
            value="tout"
          />
          <div className='pl-5'>
            <RadioButton
              changed={handleChange}
              id="2"
              isSelected={selectedValue === "conge"}
              label="en congé"
              value="conge"
            />

            <RadioButton
              changed={handleChange}
              id="3"
              isSelected={selectedValue === "ouvert"}
              label="ouvert"
              value="ouvert"
            />
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className='title1'>date de création</div>
          <div className='title2 pl-5 pt-2'>aprés</div>
          <input
            id="4"
            onChange={handleInputAfterChange}
            value={selectedAfterDate}
            type="date"
            className='date pl-5 pr-2 mt-2 ml-5'
          />
          <div className='title2 pl-5 pt-2'>avant</div>
          <input
            id="4"
            onChange={handleInputBeforeChange}
            value={selectedBeforeDate}
            type="date"
            className='date pl-5 pr-2 mt-2 ml-5'
          />
        </div>

    </div>
  );
}

export default Filter;
