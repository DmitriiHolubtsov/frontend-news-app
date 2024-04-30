import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='search-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search articles...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className='search-button' onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
