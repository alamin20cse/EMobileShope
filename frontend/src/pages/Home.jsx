import React, { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const Home = () => {
  const [tempSearch, setTempSearch] = useState(""); // temporary typing state
  const [searchTerm, setSearchTerm] = useState(""); // actual search term
  const [currentPage, setCurrentPage] = useState(1);

  const [products, isLoading] = useProducts(searchTerm);

  const itemsPerPage = 6;

  if (isLoading) return <h1>Loading...</h1>;

  const allProducts = products?.results || products || [];

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // Trigger search on button click
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(tempSearch); // update actual search term
    setCurrentPage(1); // reset pagination
  };

  return (
    <div className="pt-10">
      <form onSubmit={handleSearch} className="mb-5 flex gap-2">
        <input
          type="text"
          placeholder="Search here"
          className="input"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)} // update temp state while typing
        />
        <button type="submit" className="btn btn-primary bg-amber-300">
          Search
        </button>
      </form>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination */}
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
