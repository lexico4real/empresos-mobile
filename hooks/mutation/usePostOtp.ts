import { OTP_URL } from "@/config/routes"
import api from "@/lib/api"
import { PostOtpData } from "@/lib/declarations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

const usePostOtp = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostOtpData) => {
      return api.post('/users/otp', data)
    },
    onSuccess: (data) => {
      if (data) {
        router.push(OTP_URL)
        AsyncStorage.setItem('userSecret', data?.data?.secret)
        queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.error(error)
      Alert.alert('Error', error.response.data.message ?? 'Failed to onboard customer. Please try again.')
    }
  })

  const handlePostOtp = (data: PostOtpData) => {
    mutate(data)
  }

  return { isPending, handlePostOtp }
}

export default usePostOtp