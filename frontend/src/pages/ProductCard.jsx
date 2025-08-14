import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';
import Axios from "axios";
import useMyCart from '../hooks/useMyCart'; // তোমার useMyCart হুক
import useIsLoggedIn from '../hooks/useIsLoggedin';

const ProductCard = ({ product }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);
  
    const isLoggedIn=useIsLoggedIn()
  // console.log(isLoggedIn);
  const navigate=useNavigate()


  //from useMyCart  to  refetch 
  const [, , , , , refetch] = useMyCart();

  const addtocart = async (id) => {
    if(!isLoggedIn)
    {
      navigate('/login')
      return

    }
    try {
      await Axios({
        method: 'post',
        url: `${BASE_URL}/api/addtocart/`,
        data: { id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product added to cart!");

      // কার্ট ডেটা আবার ফেচ
      refetch();

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.category.title}</p>
      <p className="mt-1 text-gray-700 line-clamp-3">
        {(product.description).substring(0, 70)}....
        <Link to={`/product/${product.id}`} className='btn'>More ..</Link>
      </p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-red-600 font-bold">
          ৳{product.selling_price.toLocaleString()}
        </span>
        {product.marcket_price > product.selling_price && (
          <span className="text-gray-400 line-through">
            ৳{product.marcket_price.toLocaleString()}
          </span>
        )}
      </div>
      <div>
        <button onClick={() => addtocart(product.id)} className='btn btn-primary'>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
