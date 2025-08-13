import { useQuery } from '@tanstack/react-query'
import api from '../api'
import { ACCESS_TOKEN } from '../constants'

const useProfile = () => {

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);
 const token = localStorage.getItem(ACCESS_TOKEN);
  //  console.log(token);

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    enabled: !!token, // only run if token exists
    queryFn: async () => {
      const res = await api.get(`${BASE_URL}/api/user/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`, // use actual token value
        },
      })
      return res.data
    },
    staleTime: 0,
  })

  return [data ?? null, isLoading, error]
}

export default useProfile
