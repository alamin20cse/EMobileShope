import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategoryName = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const { refetch, data: categori = [], isLoading } = useQuery({
    queryKey: ["categori"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/categori/`);
      return res.data;
    },
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });

  return [categori, isLoading, refetch];
};

export default useCategoryName;
