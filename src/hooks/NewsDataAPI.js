import { useState, useEffect } from 'react';
import axios from 'axios';

const language = 'en';
const apiKey = 'pub_4302360181f3b51ee301bb17d21e1c2d87caa';

const useFetchNewsDataAPI = ({
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
        return '';
    }
  };

  // Test endpoint:
  // https://newsdata.io/api/1/news?apikey=pub_4302360181f3b51ee301bb17d21e1c2d87caa&language=en

  useEffect(() => {
    const fetchArticles = async () => {
      let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=${language}`;

      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }
      if (date) {
        url += `&pubDate=${getDate(date)}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      // This available only in paid plans
      // if (source) {
      //   url += `&source=${source}`;
      // }

      try {
        const response = await axios.get(url);
        setArticles(response.data.response.results);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data || 'Unknown error');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm, date, category, source]);

  return { articles, loading, error };
};

export default useFetchNewsDataAPI;
