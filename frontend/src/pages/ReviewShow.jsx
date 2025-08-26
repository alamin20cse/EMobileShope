import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const ReviewShow = () => {
    const { id } = useParams();
    console.log(id);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(reviews);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem(ACCESS_TOKEN);
useEffect(() => {
    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/api/product-reviews/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(response.data.results); // <- results array
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    fetchReviews();
}, [id, BASE_URL, token]);



    if (loading) return <div className="text-center py-8">Loading reviews...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Reviews for Product #{id}</h1>
            
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet for this product.</p>
            ) : (
                <div className="grid gap-4">
                    {reviews.map(review => (
                        <div key={review?.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold">{review?.email}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(review?.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-700 mb-3">{review.description}</p>
                            {review?.image && (
                                <img 
                                    src={review?.image} 
                                    alt="Review" 
                                    className="w-32 h-32 object-cover rounded"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewShow;
