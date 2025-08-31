import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = (searchTerm = "") => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products", searchTerm], // searchTerm dependency
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/product/`, {
        params: { search: searchTerm }, // backend search query
      });
      return res.data;
    },
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });

  return [products, isLoading, refetch];
};

export default useProducts;
