import React from 'react';
import './Popup.scss';

const PopupWindow = ({ title, onClose, children }) => {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <h2>{title}</h2>
          <button className='close-button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='popup-body'>{children}</div>
      </div>
    </div>
  );
};

export default PopupWindow;
