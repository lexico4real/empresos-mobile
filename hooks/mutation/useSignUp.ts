import { SIGN_IN_URL } from "@/config/routes"
import api from "@/lib/api"
import { SignUpFormData } from "@/lib/declarations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useSignUp = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpFormData) => {
      return api.post('/users/register', data)
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
      Alert.alert('Error', error.response.data.message)
    }
  })

  const handleSignUp = (data: SignUpFormData) => {
    mutate(data)
  }

  return { isPending, handleSignUp }
}

export default useSignUp