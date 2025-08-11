import React from 'react';
import useProducts from '../hooks/useProducts';

const Home = () => {

    const [products, isLoading, refetch]=useProducts()
    if(isLoading)
    {
        return <h1>loading</h1>
    }
    console.log(products);
    return (
        <div>
            Home
            <h1 className='text-3xl'>home</h1>
        </div>
    );
};

export default Home;