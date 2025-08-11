import React from 'react';
import { Link, NavLink } from "react-router-dom";
const ProductCard = ({ product }) => {
    return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-500">{product.category.title}</p>
      <p className="mt-1 text-gray-700 line-clamp-3">{(product.description).substring(0,70)}....     <Link to={`/product/${product.id}`} className='btn'>More ..</Link> </p>
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
        <button className='btn btn-primary'>Add to card</button>
      </div>
    </div>
  );
};

export default ProductCard;