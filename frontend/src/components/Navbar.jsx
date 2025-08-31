import React, { useContext } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedin';
import useMyCart from '../hooks/useMyCart';
import useProfile from '../hooks/useProfile';
import Loading from '../pages/Loading';

const NavBar = () => {
    const navigate = useNavigate();

  const isLoggedIn=useIsLoggedIn()
  const [cart, completeCarts, incompleteCarts, isLoading, error,refetch ]=useMyCart()
     const [profile, isLoadingPfofile] = useProfile();
      const BASE_URL = import.meta.env.VITE_BASE_URL;


    if (isLoadingPfofile) return <Loading></Loading>
    // console.log(profile);

  // console.log(incompleteCarts.length);
  // console.log(incompleteCarts[0]?.cartproduct?.length);

  const logOutbutton = () => {
    // এখানে আপনার লগআউট লজিক দিন (token clear, state update ইত্যাদি)
    navigate('/logout');
  };
     // Navigation Links
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
   
    
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    
    
      <li>
        <NavLink to="/dashboard/mycart">
        <div className="badge badge-secondary">My Cart ({incompleteCarts[0]?.cartproduct?.length}+) </div>
        </NavLink>
      </li>
    
    </>
  );
 

  
    return (
        <div className="navbar  mx-auto bg-opacity-30 z-30 bg-black text-white">
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost bg-base-100 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            {/* Logo */}
            <Link to="/" className="btn btn-ghost text-xl">
              {/* <img className="h-10 w-10 rounded-full" src={logo} alt="Logo" /> */}
              <h1 className='text-2xl font-bold'>EMobile shop</h1>
            </Link>
          </div>
    
          {/* Center Links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
    
          {/* Right Section */}
          <div className="navbar-end flex items-center gap-4">
            {/* Dark/Light Mode Toggle */}
            {/* <button onClick={toggleTheme} className="btn"> */}
              {/* {isDarkMode ? <IoSunny></IoSunny> : <IoMoon></IoMoon>} */}
            {/* </button> */}
    
            {/* User Section */}
            {isLoggedIn ? (
              <div className="relative flex items-center">
                <div className="group relative flex items-center justify-center">
                  {/* User Profile Picture */}
                  <img
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500"
                   src={profile?.photo || '/vite.svg'}
                    alt="User Profile"
                  />
                  {/* Dropdown */}
                  <div className="absolute z-50 flex flex-col items-center top-full mt-0 group-hover:opacity-100 group-hover:visible opacity-0 invisible transition-opacity duration-300">
                    <div className="bg-gray-800 text-white text-sm rounded px-2 py-1">{profile?.username}</div>
                    <button
                      onClick={logOutbutton}
                      className="bg-red-500 text-white rounded px-3 py-1 shadow-md hover:bg-red-600 mt-1"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
           
          ) : (
              <div className="flex flex-col lg:flex-row md:flex-row gap-3">
                <Link className="btn" to="/login">
                  Login
                </Link>
                <Link className="btn" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      );
};

export default NavBar;