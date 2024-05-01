import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ArticleList from './components/ArticleList/ArticleList';
import Filter from './components/Filter/Filter';
import SearchBar from './components/SearchBar/SearchBar';
import PersonalizedFeed from './components/PersonalizedFeed/PersonalizedFeed';
import useFetchNewsAPI from './hooks/NewsAPI';
import useFetchGuardianAPI from './hooks/NewsGuardianAPI';
import useFetchNewsDataAPI from './hooks/NewsDataAPI';
import PopupWindow from './components/Popup/Popup';
import './styles/App.scss';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [personalizationOptions, setPersonalizationOptions] = useState({});

  // NewsAPI
  const {
    articles: newsAPIArticles,
    loading: newsAPILoading,
    error: newsAPIError,
  } = useFetchNewsAPI({
    searchTerm,
    ...filterOptions,
    ...personalizationOptions,
  });

  // GuardianAPI
  const {
    articles: guardianArticles,
    loading: guardianLoading,
    error: guardianError,
  } = useFetchGuardianAPI({
    searchTerm,
    ...filterOptions,
    ...personalizationOptions,
  });

  // NewsDataAPI
  const {
    articles: newsDataAPIArticles,
    loading: newsDataAPILoading,
    error: newsDataAPIError,
  } = useFetchNewsDataAPI({
    searchTerm,
    ...filterOptions,
    ...personalizationOptions,
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (options) => {
    setFilterOptions(options);
    setShowFilters(false); // Close filters popup when filter is applied
  };

  const handlePersonalize = (options) => {
    setPersonalizationOptions(options);
    setShowPersonalize(false); // Close personalize popup when filter is applied
  };

  // Combine articles from different sources into one array
  const combinedArticles = [
    ...newsAPIArticles,
    ...guardianArticles,
    ...newsDataAPIArticles,
  ];

  // Loading and error handling
  if (newsAPILoading && guardianLoading && newsDataAPILoading) {
    return <div>Loading...</div>;
  }

  if (newsAPIError && guardianError && newsDataAPIError) {
    return (
      <div>Error: {newsAPIError || guardianError || newsDataAPIError}</div>
    );
  }

  return (
    <div>
      <Header
        onFilterClick={() => setShowFilters(true)}
        onPersonalizeClick={() => setShowPersonalize(true)}
      />
      <div className='controls'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <ArticleList articles={combinedArticles} />
      <Footer />
      {showFilters && (
        <PopupWindow title='Filters' onClose={() => setShowFilters(false)}>
          <Filter onFilter={handleFilter} />
        </PopupWindow>
      )}
      {showPersonalize && (
        <PopupWindow
          title='Personalize Feed'
          onClose={() => setShowPersonalize(false)}
        >
          <PersonalizedFeed onPersonalize={handlePersonalize} />
        </PopupWindow>
      )}
    </div>
  );
};

export default App;
