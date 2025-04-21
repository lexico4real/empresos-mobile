import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const useGetUser = () => {
  const getUser = async () => {
    const response = await api.get('/users')
    return response.data
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUser,
  })
  return { data, isLoading, error }
}

export default useGetUser
