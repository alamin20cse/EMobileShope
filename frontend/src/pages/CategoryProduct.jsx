import Axios from "axios"; // possible but then use `new Axios()` (not common)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from "./ProductCard";



const CategoryProduct = () => {
    
   
       const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams()
    const [cataproduct, setCataproduct] = useState(null)
    useEffect(() => {
        const getcategoridata = async () => {
            await Axios({
                method: 'get',
                url: `${BASE_URL}/api/categori/${id}/`
            }).then(response => {


                // console.log(response.data[0]);

                setCataproduct(response.data[0])
            })
        }
        getcategoridata()
    }, [id])

    if(!cataproduct)
    {
        return <h1>Loading</h1>
    }
  console.log(cataproduct);
    return (
        <div>
          
      {/* Product Grid */}

     <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">

      {/* map over the array inside cataproduct.category_product */}

      {cataproduct.category_product.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

        </div>
    );
}; 




export default CategoryProduct;