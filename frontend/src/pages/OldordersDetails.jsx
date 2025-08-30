import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';



import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from './Payment/CheckoutForm';
import { Helmet } from 'react-helmet-async';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const OldordersDetails = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem(ACCESS_TOKEN);

  const [details, setDetails] = useState(null);
  // console.log(details);


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await api.get(`${BASE_URL}/api/orders/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Order details:", res.data);
        // তোমার JSON অনুযায়ী data অ্যারের প্রথম অবজেক্ট নিচ্ছি
        if (res.data?.data?.length > 0) {
          setDetails(res.data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
      }
    };

    if (token) {
      fetchOrderDetails();
    }
  }, [BASE_URL, id, token]);

  if (!details) {
    return <h1>Loading...</h1>;
  }

  const products = details?.cartproduct;




  

  // --- PDF Download Function ---
const handleDownloadPDF = async () => {
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFontSize(16);
  doc.text(`Order Details #${id}`, 10, 10);

  let yOffset = 20;
  doc.setFontSize(12);

  // Order info
  doc.text(`Date: ${details.date}`, 10, yOffset);
  yOffset += 6;
  doc.text(`Email: ${details.email}`, 10, yOffset);
  yOffset += 6;
  doc.text(`Mobile: ${details.mobile}`, 10, yOffset);
  yOffset += 6;
  doc.text(`Total: ${details.total}`, 10, yOffset);
  yOffset += 6;
  doc.text(`Discount: ${details.discount}`, 10, yOffset);
  yOffset += 6;
  doc.text(`Address: ${details.address}`, 10, yOffset);
  yOffset += 10;

  // Products
  doc.text("Products:", 10, yOffset);
  yOffset += 6;

  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    doc.text(`${i + 1}. ${prod.product[0]?.title}`, 10, yOffset);
    yOffset += 6;
    doc.text(`Price: ${prod.price}, Quantity: ${prod.quantity}, Subtotal: ${prod.subtotal}`, 10, yOffset);
    yOffset += 10;

    // নতুন পেজ যদি bottom-এ পৌঁছায়
    if (yOffset > 250) {
      doc.addPage();
      yOffset = 10;
    }
  }

  doc.save(`Order_${id}_Details.pdf`);
};

















  return (
    <div className="container p-3">
      <Helmet>
        <title>Emobile Shope | Old Order Details </title>
      </Helmet>

      <div>
           <button
                onClick={handleDownloadPDF}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 hover:scale-105 transition-all duration-200"
>
            
                Download PDF
            </button>
      </div>
      <h1 className="mb-4">Old Order Details</h1>

      {/* Order Info Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Discount</th>
            <th>Products</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{details.date}</td>
            <td>{details.total}</td>
            <td>{details.email}</td>
            <td>{details.mobile}</td>
            <td>{details.discount}</td>
            <td>{details.cartproduct?.length}</td>
            <td>{details.address}</td>
          </tr>
        </tbody>
      </table>

      {/* Product Details Table */}
      <h2 className="mt-4">Product Details</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SN</th>
            <th>Product</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.product[0]?.title}</td>
              <td>
                <img
                  src={data.product[0]?.image}
                  alt={data.product[0]?.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>{data.price}</td>
              <td>{data.quantity}</td>
              <td>{data.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>








<div>
  Payment

   
           <Elements stripe={stripePromise}>
            <CheckoutForm details={details}></CheckoutForm>


           </Elements>
</div>



    </div>
  );
};

export default OldordersDetails;
