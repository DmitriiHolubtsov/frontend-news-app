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
import './styles/App.scss';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
  };

  const handlePersonalize = (options) => {
    setPersonalizationOptions(options);
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
      <Header />
      <div className='controls'>
        <Filter onFilter={handleFilter} />
        <PersonalizedFeed onPersonalize={handlePersonalize} />
        <SearchBar onSearch={handleSearch} />
      </div>
      <ArticleList articles={combinedArticles} />
      <Footer />
    </div>
  );
};

export default App;
