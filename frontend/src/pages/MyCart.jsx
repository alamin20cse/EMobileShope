import React from "react";
import useMyCart from "../hooks/useMyCart";

const MyCart = () => {
  const [cart, completeCarts, incompleteCarts, isLoading, error] = useMyCart();

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    return <h1>Error loading cart</h1>;
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
          {incompleteCarts?.map((cartItem) =>
            cartItem.cartproduct?.map((cp, index) => (
              cp.product?.map((p) => (
                <tr key={`${cartItem.id}-${cp.id}`} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{p.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{cp.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{cp.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{cp.subtotal}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyCart;
