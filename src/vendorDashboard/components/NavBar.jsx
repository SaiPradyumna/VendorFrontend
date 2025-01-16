import React from 'react';

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {

const firmname = localStorage.getItem('firmname');

return (
<div className="flex font-bold tracking-widest space-x-4 font-display
     font-extrabold text-[#e8e6e9] text-black font-medium uppercase
    bg-gray-400 border-t-2 border-b-2 border-black shadow-md justify-around     items-center h-16 max-w-10xl">

  <div className="ml-2 font-body">
    Vendor Dashboard
  </div>
  <div className="font-body">
    <h4>Firm Name: {firmname}</h4> {/* Fixed the text for consistency */}
  </div>
  <div className="userAuth font-body rounded p-2 hover:animate-pulse outline cursor-pointer mr-2 bg-orange-400">
    {/* Replace 'outline' with 'border' and adjust margin */}
    {!showLogOut ? (

    <>
      <span onClick={showLoginHandler}>Login / </span>
      <span onClick={showRegisterHandler}>Register</span>
    </>
    ) : (
    <span onClick={logOutHandler} className="logout">
      Logout
    </span>
    )}
  </div>
</div>
);
};

export default NavBar;