import React from 'react';
import './Header.scss';

const Header = ({ onFilterClick, onPersonalizeClick }) => {
  return (
    <div className='header'>
      <h1>News Aggregator</h1>
      <div className='header-buttons'>
        <button className='header-button' onClick={onFilterClick}>
          Filters
        </button>
        <button className='header-button' onClick={onPersonalizeClick}>
          Personalize
        </button>
      </div>
    </div>
  );
};

export default Header;
