import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; {new Date().getFullYear()} News Aggregator</p>
    </div>
  );
};

export default Footer;
