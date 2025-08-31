import React from 'react';
import useOldOrders from '../hooks/useOldOrders';

const DashboardMain = () => {
      const [orders, isLoading, error,refetch]=useOldOrders()
      if(isLoading)
      {
        return <h1>Loading......</h1>
      }
      console.log(orders);
    return (
        <div>
        <h1 className='text-3xl font-bold text-center py-5'>Welcome to Dashboard</h1>

            <div className="grid grid-cols-3 gap-4 mb-6">
    <div className="bg-blue-500 text-white p-4 rounded shadow">
        <h3>Total Orders</h3>
        <p>{orders.length}</p>
    </div>
    <div className="bg-green-500 text-white p-4 rounded shadow">
        <h3>Total Revenue</h3>
        <p>${orders.reduce((sum, order) => sum + order.total, 0)}</p>
    </div>
    <div className="bg-yellow-500 text-white p-4 rounded shadow">
        <h3>Pending Payments</h3>
        <p>{orders.filter(order => !order.payment_complit).length}</p>
    </div>
</div>









<table className="min-w-full border">
    <thead>
        <tr>
            <th>ID</th>
            <th>Customer Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {orders.map(order => (
            <tr key={order.id} className="text-center border-t">
                <td>{order.id}</td>
                <td>{order.email || "N/A"}</td>
                <td>${order.total}</td>
                <td>{order.order_status}</td>
                <td>{order.date}</td>
            </tr>
        ))}
    </tbody>
</table>












        </div>
    );
};

export default DashboardMain;