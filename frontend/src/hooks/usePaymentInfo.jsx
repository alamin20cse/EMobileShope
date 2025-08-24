import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useProfile from "./useProfile";
import { ACCESS_TOKEN } from "../constants";

const usePaymentInfo = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);

  const [profile, isLoadingProfile, errorProfile] = useProfile();

  // Only run query when profile is loaded
  const { refetch, data: paymentinfo = [], isLoading, error } = useQuery({
    queryKey: ["paymentinfo", profile?.email],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/payments/${profile.email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!profile?.email && !isLoadingProfile, // prevents query before profile is ready
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
  });

  return [paymentinfo, isLoading || isLoadingProfile, error || errorProfile, refetch];
};

export default usePaymentInfo;
