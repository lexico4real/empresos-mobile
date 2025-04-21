import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserAccount = () => {
  const getUserAccount = async () => {
    const response = await api.get('/account')
    return response.data
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['userAccount'],
    queryFn: getUserAccount,
  })
  return { data, isLoading, error }
}

export default useGetUserAccount