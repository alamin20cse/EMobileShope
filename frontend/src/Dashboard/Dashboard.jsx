import { NavLink, Outlet } from "react-router-dom";

import { FaHome, FaUser, } from "react-icons/fa";


import { BsCart4 } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { MdPayment } from "react-icons/md";


import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import useIsLoggedIn from "../hooks/useIsLoggedin";
import useMyCart from "../hooks/useMyCart";
import { Helmet } from "react-helmet-async";
import Loading from "../pages/Loading";







const Dashboard = () => {
   

     const isLoggedIn = useIsLoggedIn()
  console.log(isLoggedIn);
   
  const [cart, completeCarts, incompleteCarts, isLoading, error,refetch ]=useMyCart()

  if(isLoading)
  {
    return <Loading></Loading>
  }
   
   
    

    // Link structure
    const link = (
        <>



        <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <FaHome></FaHome> Home
                </NavLink>
            </li>
         <li>
                <NavLink 
                    to="/dashboard/profile" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <FaUser /> Profile
                </NavLink>
            </li>
       
            <li>
                <NavLink 
                    to="/dashboard/mycart" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                   <BsCart4 /> Mycart ({incompleteCarts[0]?.cartproduct?.length}+)
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/dashboard/oldorder" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <GiSkills /> Old Oreder
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/dashboard/payment" 
                    className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                >
                    <MdPayment /> Payment info
                </NavLink>
            </li>
         
           
           
            
         
            
           
            

            {/* Admin Role */}

            {/* {isLoggedIn && (
              
              <>
                <li>
                    <NavLink 
                        to="/dashboard/allusers" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                        <FaUsers /> Add Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/dashboard/addnewcampaign" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                       <MdAddToPhotos /> Add Skills
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/dashboard/allpaymentinfo" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                       <MdCastForEducation /> Add  Education
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/dashboard/mycampaign" 
                        className={({ isActive }) => isActive ? "text-white bg-blue-500" : "hover:text-white"}
                    >
                       <GoProjectSymlink /> Add Projects
                    </NavLink>
                </li>
              
              
              </>
            )} */}

           
        </>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
             <Helmet>
                <title>Emobile Shope | Dashboard</title>
             </Helmet>
       
   
            {/* Navbar for Mobile */}
            <div className="navbar bg-base-100 lg:hidden">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dashboard </a>
                </div>
            </div>

            {/* Sidebar for Larger Screens */}
            <div className="hidden py-4 lg:block w-64 bg-blue-200  p-4">
                <ul className="space-y-2 menu p-4">
                    {link}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full">
                <div className="flex-1 p-4 bg-gray-50">
                    <div>
                      
                    </div>
                 
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
