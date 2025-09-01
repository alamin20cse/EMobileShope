import React from "react";
import { Link } from "react-router-dom";
import usePaymentInfo from "../hooks/usePaymentInfo";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const PaymentInformation = () => {
  const [paymentinfo, isLoading, error, refetch] = usePaymentInfo();

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return <h1>Error loading payment info</h1>;
  }

  return (
    <div className="p-4">
      <Helmet>
        <title>Dashboard | Payment Information </title>
      </Helmet>
      <h2 className="text-xl font-bold mb-3">Payment Information</h2>

      {paymentinfo.length > 0 ? (
       <div className="overflow-x-auto"> <table className="table table-bordered w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {paymentinfo.map((item, i) => (
              <tr key={item.id || i}>
                <td>{i + 1}</td>
                <td>{item.email}</td>
                <td>TK. {item.price}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      ) : (
        <div className="text-center my-5">
          <h1 className="text-2xl font-semibold">No Old Order</h1>
          <Link to="/" className="btn btn-info mt-3">
            GO HOME
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentInformation;
