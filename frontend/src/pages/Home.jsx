import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const Home = () => {
  const [products, isLoading] = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // If your API response has results array
  const allProducts = products?.results || [];

  // Calculate pagination indexes
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  return (
    <div className="pt-10">
      {/* Product Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
