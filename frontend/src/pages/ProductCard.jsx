import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';
import Axios from "axios";
import useMyCart from '../hooks/useMyCart';
import useIsLoggedIn from '../hooks/useIsLoggedin';
import useProfile from '../hooks/useProfile';
import { useForm } from "react-hook-form";

const ProductCard = ({ product }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);

  // Hooks সবসময় top-level এ
  const [profile, isLoading, error] = useProfile();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const [, , , , , refetch] = useMyCart();

  // React Hook Form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      description: "",
      image: null,
    },
  });

  // loading / no-product check
  if (!product) {
    return <h1>Loading product...</h1>;
  }
  if (isLoading) {
    return <h1>Loading profile...</h1>;
  }

  // Review submit
  const onSubmit = async (data) => {
    try {
      if (!product.id) return alert("Product ID missing!");
      if (!profile?.email) return alert("Please login to submit review!");

      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("product", product.id.toString());
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await Axios.post(`${BASE_URL}/api/review/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
      alert("Review submitted successfully!");
      console.log("Review submitted:", res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Error submitting review: " + (err.response?.data?.message || "Please check your input"));
    }
  };

  // Add to cart
  const addtocart = async (id) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await Axios.post(`${BASE_URL}/api/addtocart/`, { id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product added to cart!");
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
      <p className="text-sm text-gray-500">{product.category?.title}</p>
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
        <button onClick={() => addtocart(product.id)} className='btn btn-primary'>
          Add to cart
        </button>
      </div>

      {/* Review Form */}
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold mb-2">Leave a Review</h3>

        <textarea
          placeholder="Your review"
          {...register("description", { required: true })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="file"
          {...register("image")}
          className="mb-2 file-input"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
        <Link to={`/dashboard/review/${product.id}`} className="btn btn-primary mx-5">
  Show review
</Link>

      </form>
    </div>
  );
};

export default ProductCard;
