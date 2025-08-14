import React from "react";
import useMyCart from "../hooks/useMyCart";
import { NavLink } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IoBagAddSharp,IoBagRemoveOutline  } from "react-icons/io5";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";

const MyCart = () => {
  const [cart, completeCarts, incompleteCarts, isLoading, error,refetch ] = useMyCart();

   const token = localStorage.getItem(ACCESS_TOKEN);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

 

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    return <h1>Error loading cart</h1>;
  }

  // console.log(incompleteCarts[0].id);
//Incomplete carts এর প্রথম cart এর সব cartproduct
  const InCompleteProduct = incompleteCarts[0]?.cartproduct || [];

  // মোট দাম হিসাব
  const totalAmount = InCompleteProduct.reduce(
    (total, cp) => total + (cp.subtotal || 0),
    0
  );





  const updatecartproduct=async (id)=>{

     try {
      await axios.post(
        `${BASE_URL}/api/updatecartproduct/`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }

  }

  const decreaseCartproduct=async (id)=>{

     try {
      await axios.post(
        `${BASE_URL}/api/decreasecartproduct/`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product Decrease to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }

  }

  
  const delatecartproduct=async(id)=>{

    
     try {
      await axios.post(
        `${BASE_URL}/api/deletecartproduct/`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product Decrease to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }

  }




  const DeleteFullCart=async(id)=>{
   
     try {
      await axios.post(
        `${BASE_URL}/api/deletefullcart/`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product Decrease to cart!");
      refetch();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }

  }

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">SN</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Subtotal</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
  <tbody>
          {InCompleteProduct.map((cp, index) =>
            cp.product?.map((prod) => (
              <tr key={cp.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{prod.title}</td>
                <td className="border border-gray-300 px-4 py-2">{cp.price}</td>
                <td className="border border-gray-300 px-4 py-2">{cp.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{cp.subtotal}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan={4} className="border border-gray-300 px-4 py-2">
              Total
            </td>
            <td className="border border-gray-300 px-4 py-2">{totalAmount}</td>
            <td className="border border-gray-300 px-4 py-2">
              <NavLink className="btn btn-primary" to="/ordernow">
                Order Now
              </NavLink>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="py-5">
        <button onClick={()=>DeleteFullCart(incompleteCarts[0].id)} className="btn btn-primary">Delete Full Cart</button>
      </div>
      <NavLink className='btn btn-primary' to='/oldorder'>Old order</NavLink>
    </div>
  );
};

export default MyCart;
