import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Link
        to="/"
        className="text-blue-500 text-lg hover:text-blue-700 transition duration-200"
      >
        <p>Go Back</p>
      </Link>
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <div className="text-lg text-gray-600 mt-2">Page Not Found</div>
    </div>
  );
};

export default NotFound;
