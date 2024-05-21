import React from 'react';
import { Link } from 'react-router-dom';
import "../../../css/404.css";
const NotFound = () => (
  <div className="not-found">
    <img
      src="assets/images/home/404.png"
      alt="not-found"
    />
    <Link to="/" className="link-home">
      Go Home
    </Link>
  </div>
);

export default NotFound;
