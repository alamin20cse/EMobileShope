import React from "react";
import useMyCart from "../hooks/useMyCart";
import { NavLink } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IoBagAddSharp, IoBagRemoveOutline } from "react-icons/io5";
import { ACCESS_TOKEN } from "../constants";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const MyCart = () => {
  const [cart, completeCarts, incompleteCarts, isLoading, error, refetch] =
    useMyCart();

  const token = localStorage.getItem(ACCESS_TOKEN);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return <h1>Error loading cart</h1>;
  }

  // Incomplete carts এর প্রথম cart এর সব cartproduct
  const InCompleteProduct = incompleteCarts[0]?.cartproduct || [];

  // মোট দাম হিসাব
  const totalAmount = InCompleteProduct.reduce(
    (total, cp) => total + (cp.subtotal || 0),
    0
  );

  // Increase quantity
  const updatecartproduct = async (id) => {
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added to cart!",
        showConfirmButton: false,
        timer: 1500,
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

  // Decrease quantity
  const decreaseCartproduct = async (id) => {
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
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Product quantity decreased!",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch();
    } catch (error) {
      console.error("Error decreasing product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to decrease product",
      });
    }
  };

  // Delete single product with confirmation
  const delatecartproduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product removed from cart!",
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
        } catch (error) {
          console.error("Error deleting cart product:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to remove product",
          });
        }
      }
    });
  };

  // Delete full cart with confirmation
  const DeleteFullCart = async (id) => {
    Swal.fire({
      title: "Delete full cart?",
      text: "All products in this cart will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
          Swal.fire({
            icon: "success",
            title: "Cart deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
        } catch (error) {
          console.error("Error deleting full cart:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to delete full cart",
          });
        }
      }
    });
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Emobile Shope | My Cart</title>
      </Helmet>
     <div className="overflow-x-auto">
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
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {prod.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">{cp.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {cp.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {cp.subtotal}
                </td>
                <td>
                  <button
                    onClick={() => decreaseCartproduct(cp.id)}
                    className="btn btn-info mx-1"
                  >
                    <IoBagRemoveOutline className="text-2xl " />{" "}
                  </button>
                  <button
                    onClick={() => delatecartproduct(cp.id)}
                    className="btn btn-danger mx-1"
                  >
                    <MdDeleteForever className="text-red-600 text-3xl" />
                  </button>
                  <button
                    onClick={() => updatecartproduct(cp.id)}
                    className="btn mx-1"
                  >
                    <IoBagAddSharp className="text-green-700 text-2xl" />
                  </button>
                </td>
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
     </div>

      <div className="py-5">
        <button
          onClick={() => DeleteFullCart(incompleteCarts[0].id)}
          className="btn btn-primary"
        >
          Delete Full Cart
        </button>
      </div>
      <NavLink className="btn btn-primary" to="/dashboard/oldorder">
        Old order
      </NavLink>
    </div>
  );
};

export default MyCart;
