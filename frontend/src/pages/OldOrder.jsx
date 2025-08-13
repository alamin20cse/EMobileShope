import React from 'react';
import useOldOrders from '../hooks/useOldOrders';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';

const OldOrder = () => {

    const [orders, isLoading, error]=useOldOrders()
    console.log(orders);
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
                                    <td><Link to={`/oldorders/${order.id}`} className="btn btn-success">Details</Link></td>
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