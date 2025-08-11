import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductDetailes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [product, setProduct] = useState(null);
  const [categoryproduct, setCategoryproduct] = useState(null);

  // Helper function to get category data
  const getCategoryData = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/categori/${categoryId}/`);
      setCategoryproduct(response?.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Get product data
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/product/${id}/`);
        setProduct(response?.data);
        // Fetch category data after getting product
        if (response?.data?.category?.id) {
          getCategoryData(response.data.category.id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id, BASE_URL]);

  // Add to cart function
  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/api/addtocart/`, 
          { id: productId },
          {
            headers: {
              Authorization: `token ${token}`
            }
          }
        );
        console.log("Added to cart:", response);
        // You can add success notification here
        alert("Product added to cart successfully!");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart");
      }
    } else {
      // Redirect to login if no token
      navigate('/login');
    }
  };

  if (!product) {
    return <h1>Loading..</h1>;
  }

  console.log(product);
  console.log(product.category?.id);
  console.log(categoryproduct);

  return (
    <div className="container mx-auto px-4">
      {product && (
        <>
          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="p-4">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="mb-4">
                <h2 className="text-xl">
                  Price: 
                  <span className="line-through text-gray-500 ml-2">
                    ৳{product.marcket_price?.toLocaleString()}
                  </span>
                  <span className="text-red-600 font-bold ml-2">
                    ৳{product.selling_price?.toLocaleString()}
                  </span>
                </h2>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <button 
                onClick={() => addToCart(product.id)} 
                className="btn btn-success text-white px-6 py-2 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}

      {/* Related Products Section */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6">Related Products</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {categoryproduct !== null &&
            categoryproduct[0]?.category_product?.map((relatedProduct, i) => (
              <div key={i} className="col-span-1">
                <ProductCard product={relatedProduct} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailes;