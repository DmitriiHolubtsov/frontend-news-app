import axios from 'axios';
import { useState, useEffect } from 'react';

const language = 'us';
const apiKey = 'da915ac240804f93ab3b156c1cd2e289';

const useFetchNewsAPI = ({
  searchTerm = '',
  category = '',
  source = '',
  date = '',
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDate = (date) => {
    switch (date) {
      case 'today':
        return new Date().toISOString().slice(0, 10);
      case 'this_week':
        const today = new Date();
        const firstDayOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay()),
        );
        return firstDayOfWeek.toISOString().slice(0, 10);
      case 'this_month':
        return new Date().toISOString().slice(0, 7);
      default:
        return ''; // Return empty string for default case
    }
  };
  // 'https://newsapi.org/v2/top-headlines?country=us&apiKey=da915ac240804f93ab3b156c1cd2e289';
  useEffect(() => {
    const fetchArticles = async () => {
      let url = 'https://newsapi.org/v2/top-headlines?';

      if (searchTerm) {
        url += `q=${searchTerm}`;
      } else {
        url += `language=${language}`;
      }
      if (date) {
        url += `&from=${getDate(date)}`;
      }
      if (category) {
        url += `&sortBy=${category}`;
      }
      if (source) {
        url += `&sources=${source}`;
      }

      url += `&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setArticles(response.data.articles || []); // Set articles to response data or empty array if not present
        setLoading(false);
      } catch (error) {
        setError(error.response.data); // Set error to the response data
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm, category, source, date]);

  return { articles, loading, error };
};

export default useFetchNewsAPI;
