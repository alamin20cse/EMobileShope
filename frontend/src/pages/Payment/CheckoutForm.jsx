import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios"; // ✅ import axios
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import { ACCESS_TOKEN } from "../../constants";
import Loading from "../Loading";

const CheckoutForm = ({details}) => {

    console.log(details);
    console.log(details.id);

      const [profile, isLoadingProfile, Profileerror]=useProfile()
   
    //   console.log(profile);
  


    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    // console.log(BASE_URL);
  const token = localStorage.getItem(ACCESS_TOKEN);
//   console.log(token);

    const navigate = useNavigate();
    const totalPrice = details.total
    // console.log('cls: ',clientSecret);
    // console.log('stripe : ',stripe);

    useEffect(() => {
        const createPaymentIntent = async () => {
            if (totalPrice > 0) {
                try {
                    const res = await axios.post(
                        `${BASE_URL}/api/create-payment-intent/`,
                        { price: totalPrice },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                } catch (err) {
                    console.error('Payment intent error', err);
                }
            }
        };
        createPaymentIntent();
    }, [totalPrice, token, BASE_URL]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.log('Payment error:', paymentError);
            setError(paymentError.message);
            return;
        } else {
            console.log('Payment method:', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: profile?.email || 'anonymous',
                    name: profile?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // console.log('Transaction ID:', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            const payment = {
                email: profile?.email,
                price: details.total,
                transactionId: paymentIntent.id,
                date: new Date(),
                orderId: details.id,
              
            };

            try {
                const res = await axios.post(`${BASE_URL}/api/payments/`, payment, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Payment saved:', res.data);
                


               await axios.patch(
            `${BASE_URL}/api/orders/${details.id}/`,
            { payment_complit: true },
            { headers: { Authorization: `Bearer ${token}` } }
        );




                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the payment",
                    showConfirmButton: false,
                    timer: 1500,
                });
                

                navigate('/');
            } catch (err) {
                console.error('Error saving payment:', err);
                setError('Payment saved failed!');
            }
        }
    };

    return (
        <div className="my-5 overflow-x-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
