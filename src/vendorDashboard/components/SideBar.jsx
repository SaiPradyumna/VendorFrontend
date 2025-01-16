import React, { useState } from 'react';

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
}) => {
  
  const [isOpen, setIsOpen] = useState(true); 
  const toggleSidebar = () => setIsOpen(!isOpen); 
  

  return (
    <div
    className={`${isOpen ? '  w-64 ' : 'w-16'} 
     bg-white   text-black p-4  transition-all duration-900 ease-in-out min-h-screen max-h-screen   overflow-y-auto  border-r-2 border-black `}
  >
      <div className="flex " >
        {/* Button to toggle sidebar */}
        <div className='mt-64 '>
        <button
          onClick={toggleSidebar}
          className="text-black animate-bounce  bg-orange-400 rounded-full p-2"
        >
          {isOpen ? '< ' : '>'}
        </button>
        </div>
       
        
        <h2
          className={`text-xl ml-12  text-center font-bold ${isOpen ? 'block' : 'hidden'}`}
        >
          Dashboard
        </h2>
      </div>
     
      <ul className="flex flex-col cursor-pointer   gap-28  ml-16 -mt-56 ">
        {showFirmTitle && isOpen && (
          <li
            onClick={showFirmHandler }
            className="py-2 px-4 flex justify-center font-bold font- bg-white border-2 border-black cursor-pointer  hover:bg-orange-200  rounded-md "
          >
            Add Firm
          </li>
        )}
        {isOpen && (
          <>
            <li
              onClick={showProductHandler}
              className="py-2 px-4 flex justify-center font-bold font- bg-white border-2 border-black cursor-pointer  hover:bg-orange-200  rounded-md "
            >
              Add Product
            </li>
            <li
              onClick={showAllProductsHandler}
             className="py-2 px-4 flex justify-center font-bold font- bg-white border-2 border-black cursor-pointer  hover:bg-orange-200  rounded-md "
            >
              All Products
            </li>
            <li className="py-2 px-4 flex justify-center font-bold font- bg-white border-2 border-black cursor-pointer hover:bg-orange-200  rounded-md ">User Details</li>
          </>
        )}
      </ul>
      </div>
   
  );
};

export default SideBar;
