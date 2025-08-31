import React, { useState } from "react";
import useProducts from "../hooks/useProducts";

import useCategoryName from "../hooks/useCategoryName";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Helmet } from "react-helmet-async";
import Bannar from "../components/Bannar";
import Loading from "./Loading";

const Home = () => {
  const [tempSearch, setTempSearch] = useState(""); // temporary typing state
  const [searchTerm, setSearchTerm] = useState(""); // actual search term
  const [currentPage, setCurrentPage] = useState(1);

     const  [categori, isLoadingcategory, refetch]=useCategoryName()




  const [products, isLoading] = useProducts(searchTerm);

  const itemsPerPage = 8;

if (isLoading | isLoadingcategory)
   { 
    return <Loading></Loading>
  };

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

      <Helmet>
        <title>Emobile Shome | Home</title>
      </Helmet>

      <Bannar></Bannar>



      <form onSubmit={handleSearch} className="mb-5 flex gap-2">
        <input
          type="text"
          placeholder="Search here"
          className="input"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)} // update temp state while typing
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>


      <div>

{/* category  with dropdown */}
      <div className="my-5">
       <details className="dropdown">
  <summary className="btn btn-primary m-1">All Category</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
     <div className="col-md-3 mt-3">
                    <h1>All Categoris</h1>
                    {
                        categori?.map((cata, i) => (
                            <div className="p-2 m-2" key={i}>
                                <Link to={`/categori/${cata.id}`} className="btn btn-success">{cata.title}</Link>
                            </div>
                        ))
                    }
                </div>
  </ul>
</details>
      </div>



      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
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
