import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailes = () => {

     const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/product/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id, BASE_URL]);
if(!product)
{
    return <h1>Loading..</h1>
}
console.log(product);

    return (
        <div className='p-6'>
             <img
        src={product.image}
        alt={product.title}
        className="w-full px-5 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.category.title}</p>
      <p className="mt-1 text-gray-700 ">{product.description} </p>
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
        <button className='btn btn-primary my-5'>Add to card</button>
      </div>
            
        </div>
    );
};

export default ProductDetailes;