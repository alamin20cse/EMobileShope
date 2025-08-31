import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';
import Axios from "axios";
import useMyCart from '../hooks/useMyCart';
import useIsLoggedIn from '../hooks/useIsLoggedin';
import useProfile from '../hooks/useProfile';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


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
   if (!product.id) {
  return Swal.fire({
    icon: "error",
    title: "Product ID Missing!",
    text: "Please try again later.",
    confirmButtonColor: "#3085d6",
  });
}

if (!profile?.email) {
  return Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login to submit a review!",
    confirmButtonColor: "#f39c12",
  });
}

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
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review submitted successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      console.log("Review submitted:", res.data);
    } catch (err) {
      console.error("Error:", err);
     Swal.fire({
  icon: "error",
  title: "Error submitting review",
  text: err.response?.data?.message || "Please check your input",
});

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
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Product added to cart!",
  showConfirmButton: false,
  timer: 1500
});

      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
  icon: "error",
  title: "Failed to add product to cart",
});

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
        {(product.description).substring(0, 40)}....
        <Link to={`/product/${product.id}`} className='btn text-blue-400'>More ..</Link>
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
          className="mb-2 file-input file-input-sm text-sm"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white  px-2 py-1 text-sm rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <Link to={`/dashboard/review/${product.id}`} className="bg-blue-400 text-white ml-1 px-2 py-1 text-sm rounded hover:bg-blue-700">
  Show review
</Link>

      </form>
    </div>
  );
};

export default ProductCard;
