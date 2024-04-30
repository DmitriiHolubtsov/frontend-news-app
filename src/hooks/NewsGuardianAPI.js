import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '1ce405ff-773a-4ae6-8169-114925d419bf';

const useFetchGuardianAPI = ({
  searchTerm = '',
  date = '',
  category = '',
  source = '',
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
        return new Date().toISOString().slice(0, 10); // Default to current date
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `https://content.guardianapis.com/search?api-key=${apiKey}&show-elements=image&page-size=50`;

      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }
      if (date) {
        url += `&from-date=${getDate(date)}`;
      }
      if (category) {
        url += `&section=${category}`;
      }
      if (source) {
        url += `&source=${source}`;
      }
      try {
        const response = await axios.get(url);
        setArticles(response.data.response.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm, date, category, source]);

  return { articles, loading, error };
};

export default useFetchGuardianAPI;
