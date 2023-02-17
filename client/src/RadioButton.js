import React from 'react';
import './Filter.css';

export const RadioButton = (props) => {
    const { changed, id, isSelected, label, value } = props;
    return (
      <div className="RadioButton">
        <input
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label className='p-2 title1' htmlFor={id}>{label}</label>
      </div>
    );
  };
  