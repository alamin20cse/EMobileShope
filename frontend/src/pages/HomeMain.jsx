import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomeMain = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className='mx-auto w-10/12'> <Outlet></Outlet></div>
        </div>
    );
};

export default HomeMain;