import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useMyCart from '../hooks/useMyCart';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

import Loading from './Loading';

const OrderNow = () => {
  const [cart, completeCarts, incompleteCarts, isLoading, error, refetch] = useMyCart();
     const token = localStorage.getItem(ACCESS_TOKEN);
    //  console.log(token);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate=useNavigate()
    
  
  

  const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
      // Incomplete carts এর প্রথম cart এর সব cartproduct
  const InCompleteProduct = incompleteCarts[0]?.cartproduct || [];

//   মোট দাম হিসাব
  const totalAmount = InCompleteProduct.reduce(
    (total, cp) => total + (cp.subtotal || 0),
    0
  );

console.log(incompleteCarts[0]?.id);

     const orderData = {
        "cartId": incompleteCarts[0]?.id,
        "address": address,
        "mobile": mobile,
        "email": email,
        // "totalTaKa":totalTaKa
    }

  if (isLoading) return <Loading></Loading>
  if (error) return <h1>Error loading cart</h1>;



 const ordernow = async () => {
  try {
    const cartId = incompleteCarts[0]?.id; // ✅ সঠিকভাবে cart id নিচ্ছি
    const data = {
      cartId: cartId,
      address,
      mobile,
      email,
    };

    await axios.post(
      `${BASE_URL}/api/orders/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  
    Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Order placed successfully!",
  showConfirmButton: false,
  timer: 1500
});
    refetch();

    navigate('/dashboard/oldorder')
  } catch (error) {
    console.error("Error placing order:", error);
   
    Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Failed to place order.",
  showConfirmButton: false,
  timer: 1500
});
  }
};



  return (
    <div>
<Helmet>Oredr Now</Helmet>
      <h1>Order now page</h1>

      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">SN</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Subtotal</th>
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


      {/* form */}
      <div>
       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Address</label>
    <input
      type="text"
      placeholder="Address"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Mobile</label>
    <input
      type="text"
      placeholder="Mobile"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={(e) => setMobile(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 font-semibold text-gray-700">Email</label>
    <input
      type="text"
      placeholder="Email"

      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <button
    onClick={()=>ordernow(incompleteCarts[0]?.id)}
    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
  >
    Order
  </button>
</div>

      </div>
    </div>
  );
};

export default OrderNow;
