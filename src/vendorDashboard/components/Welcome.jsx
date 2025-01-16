import React from 'react';

const Welcome = () => {
  const firmName = localStorage.getItem("firmName");

  return (
    <div className="welcomeSection flex  fixed bg-white">
      <div className="text-left flex">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome {firmName}</h2>
         
        
      </div>
    </div>
  );
};

export default Welcome;
