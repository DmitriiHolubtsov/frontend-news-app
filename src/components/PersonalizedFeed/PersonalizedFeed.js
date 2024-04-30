import React, { useState } from 'react';
import './PersonalizedFeed.scss';

const PersonalizedFeed = ({ onPersonalize }) => {
  const [personalizationOptions, setPersonalizationOptions] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalizationOptions({ ...personalizationOptions, [name]: value });
  };

  const [showFilters, setShowFilters] = useState(false);

  const handlePersonalize = () => {
    onPersonalize(personalizationOptions);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='personalized-feed-wrapper'>
      <button className='toggle-button' onClick={toggleFilters}>
        {showFilters ? 'Personalize' : 'Personalize'}
      </button>
      <div className='personalized-feed-container'>
        {showFilters && (
          <>
            <div className='select-wrapper'>
              <select
                name='source'
                value={personalizationOptions.source}
                onChange={handleChange}
              >
                <option value=''>Select source</option>
                <option value='newsAPI'>NewsAPI</option>
                <option value='guardian'>Guardian</option>
                <option value='newsdate'>NewsDate.io</option>
              </select>
            </div>
            <div className='select-wrapper'>
              <select
                name='category'
                value={personalizationOptions.category}
                onChange={handleChange}
              >
                <option value=''>Select category</option>
                <option value='sport'>Sport</option>
                <option value='health'>Health</option>
                <option value='cars'>Cars</option>
              </select>
            </div>
            <div className='select-wrapper'>
              {/* Sorry, but I need more information about this functionality??? */}
              <select
                name='author'
                value={personalizationOptions.author}
                onChange={handleChange}
                disabled
              >
                <option value=''>Select author</option>
                <option value='author1'>Author 1</option>
                <option value='author2'>Author 2</option>
                <option value='author3'>Author 3</option>
              </select>
            </div>
            <button className='personalize-button' onClick={handlePersonalize}>
              Filter
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalizedFeed;
