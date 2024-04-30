import React, { useState } from 'react';
import './ArticleList.scss';
import Pagination from '../Pagination/Pagination';

const ArticleList = ({ articles, filterOptions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(10); // Change this to control articlesPerPage

  // Apply filtering based on filter options
  const filteredArticles = articles.filter((article) => {
    const {
      searchTerm = '',
      date = '',
      category = '',
      source = '',
    } = filterOptions || {};

    // Check if the article matches the search term
    if (
      searchTerm &&
      !article.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Check if the article matches the date filter
    if (
      date &&
      new Date(article.publishedAt).toISOString().slice(0, 10) !== date
    ) {
      return false;
    }

    // Check if the article matches the category filter
    if (
      category &&
      article.sectionName.toLowerCase() !== category.toLowerCase()
    ) {
      return false;
    }

    // Check if the article matches the source filter
    if (source && article.source.toLowerCase() !== source.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <div className='parent-container'>
        {currentArticles.map((article, index) => (
          <a
            key={index}
            href={article.url || article.webUrl || ''}
            target='_blank'
            rel='noopener noreferrer'
            className='child-link'
          >
            <div className='news-card'>
              <div className='thumbnail'>
                {article.elements?.[0]?.assets?.[0]?.file ||
                article.urlToImage ||
                article.image_url ? (
                  <img
                    src={
                      article.elements?.[0]?.assets?.[0]?.file ||
                      article.urlToImage ||
                      article.image_url
                    }
                    alt='Thumbnail'
                  />
                ) : (
                  <div className='no-image'>No Image</div>
                )}
              </div>
              <div className='content'>
                <h3>{article.title || article.webTitle || ''}</h3>
                <p className='description'>
                  {article.description || article.webTitle || ''}
                </p>
                <p className='category'>
                  {article.author || article.sectionName || ''}
                </p>
                <p className='source'>{article.source_id || ''}</p>
                <p className='date'>
                  {formatDate(
                    article.publishedAt || article.webPublicationDate || '',
                  )}
                  ;
                </p>
                <span className='link'>Read More</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={filteredArticles.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ArticleList;
