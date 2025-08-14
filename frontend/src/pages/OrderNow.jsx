import React from 'react';
import { NavLink } from 'react-router-dom';
import useMyCart from '../hooks/useMyCart';

const OrderNow = () => {
  const [cart, completeCarts, incompleteCarts, isLoading, error, refetch] = useMyCart();

  if (isLoading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error loading cart</h1>;

  // Incomplete carts এর প্রথম cart এর সব cartproduct
  const InCompleteProduct = incompleteCarts[0]?.cartproduct || [];

  // মোট দাম হিসাব
  const totalAmount = InCompleteProduct.reduce(
    (total, cp) => total + (cp.subtotal || 0),
    0
  );

  return (
    <div>
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
    </div>
  );
};

export default OrderNow;
