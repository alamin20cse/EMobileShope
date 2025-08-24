import React from 'react';
import useOldOrders from '../hooks/useOldOrders';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const OldOrder = () => {

    const [orders, isLoading, error,refetch]=useOldOrders()

    
    const token = localStorage.getItem(ACCESS_TOKEN);
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    // console.log(orders);

  const delateorderhistory = async (id) => {
  if (!window.confirm("Are you sure you want to delete this order?")) {
    return;
  }

  try {
    await axios.delete(`${BASE_URL}/api/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: id }, // body data
    });

    alert("Order deleted successfully!");
    refetch();
  } catch (error) {
    console.error("Error deleting order:", error);
    alert("Failed to delete order.");
  }
};


    return (
        <div className="container">
          
            <h1>Orders History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Totla</th>
                        <th>Product</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.length !== 0 ?
                            orders?.map((order, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>TK. {order?.total}</td>
                                    <td>{order?.cartproduct?.length}</td>
                                    <td>{order?.order_status}</td>
                                    <td> {order?.payment_complit ? "Paid" : "Not Paid"}</td>
                                    <td><Link to={`/dashboard/oldorders/${order.id}`} className="btn btn-success">Details</Link></td>
                                    <td><p onClick={() => delateorderhistory(order.id)} className="btn btn-danger">Delate</p></td>
                                </tr>
                            )) :
                            (
                                <div>
                                    <h1 className="display-1">
                                        No Old Order
                                    </h1>
                                    <Link to="/" className="btn btn-info">GO HOME</Link>
                                </div>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OldOrder;