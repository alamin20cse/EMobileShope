import { useQuery } from '@tanstack/react-query'
import api from '../api'
import { ACCESS_TOKEN } from '../constants'
import { useMemo } from 'react'

const useMyCart = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem(ACCESS_TOKEN);

  const { data, isLoading, error,refetch  } = useQuery({
    queryKey: ['cart'],
    enabled: !!token, // token থাকলেই রিকোয়েস্ট যাবে
    queryFn: async () => {
      const res = await api.get(`${BASE_URL}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    staleTime: 0,
  })

  // useMemo দিয়ে ফিল্টারিং (অপ্টিমাইজেশন)
  const completeCarts = useMemo(() => {
    return data?.cart?.filter(c => c.complit === true) || []
  }, [data])

  const incompleteCarts = useMemo(() => {
    return data?.cart?.filter(c => c.complit === false) || []
  }, [data])

  return [data ?? null, completeCarts, incompleteCarts, isLoading, error,refetch ]
}

export default useMyCart
