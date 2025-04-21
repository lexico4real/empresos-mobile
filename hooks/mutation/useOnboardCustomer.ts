import { SIGN_IN_URL } from "@/config/routes"
import api from "@/lib/api"
import { SignUpFormData } from "@/lib/declarations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useOnboardCustomer = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpFormData) => {
      return api.post('/users/customer', data)
    },
    onSuccess: (data) => {
      if (data) {
        Alert.alert('Success', 'Account created successfully! Please sign in to continue.', [
          {
            text: 'OK',
            onPress: () => router.push(SIGN_IN_URL)
          }
        ])
      }
      queryClient.invalidateQueries({ queryKey: ['users'] })

    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.error(error)
      Alert.alert('Error', error.response.data.message ?? 'Failed to onboard customer. Please try again.')
    }
  })

  const handleOnboardCustomer = (data: SignUpFormData) => {
    mutate(data)
  }

  return { isPending, handleOnboardCustomer }
}

export default useOnboardCustomer