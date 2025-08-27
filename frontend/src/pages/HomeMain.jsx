import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeMain = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className='mx-auto w-10/12'> <Outlet></Outlet></div>
           <Footer></Footer>
        </div>
    );
};

export default HomeMain;