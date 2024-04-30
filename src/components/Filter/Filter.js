import React, { useState } from 'react';
import './Filter.scss';
const Filter = ({ onFilter }) => {
  const [filterOptions, setFilterOptions] = useState({
    date: '',
    category: '',
    source: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  const handleFilter = () => {
    onFilter(filterOptions);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='filter-wrapper'>
      <button className='toggle-button' onClick={toggleFilters}>
        {showFilters ? 'Filters' : 'Filters'}
      </button>
      <div className='filter-container'>
        {showFilters && (
          <>
            <div className='select-wrapper'>
              <select
                name='date'
                value={filterOptions.date}
                onChange={handleChange}
              >
                <option value=''>Select date</option>
                <option value='today'>Today</option>
                <option value='this_week'>This week</option>
                <option value='this_month'>This month</option>
              </select>
            </div>
            <div className='select-wrapper'>
              <select
                name='category'
                value={filterOptions.category}
                onChange={handleChange}
              >
                <option value=''>Select category</option>
                <option value='sport'>Sport</option>
                <option value='politics'>Politics</option>
                <option value='film'>Arts</option>
              </select>
            </div>
            <div className='select-wrapper'>
              <select
                name='source'
                value={filterOptions.source}
                onChange={handleChange}
              >
                <option value=''>Select source</option>
                <option value='newsAPI'>NewsAPI</option>
                <option value='guardian'>Guardian</option>
                <option value='newsdate'>NewsDate.io</option>
              </select>
            </div>
            <button className='filter-button' onClick={handleFilter}>
              Filter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
