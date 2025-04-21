import { HOME_URL } from "@/config/routes"
import { useAuth } from "@/context/auth-context"
import { SignInData } from "@/lib/declarations"
import { authService } from "@/services/auth.service"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { Alert } from "react-native"

const useSignIn = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setIsAuthenticated } = useAuth()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) => {
      return authService.signIn(data)
    },
    onSuccess: (response) => {
      if (response.data?.accessToken) {
        setIsAuthenticated(true)
        router.push(HOME_URL)
        AsyncStorage.removeItem('userSecret')
        AsyncStorage.removeItem('userPassword')
        queryClient.invalidateQueries({ queryKey: ['users'] })
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.error(error)
      Alert.alert('Error', error?.response?.data?.message ?? 'Failed to sign in. Please try again.')
    }
  })

  const handleSignIn = (data: SignInData) => {
    mutate(data)
  }

  return { isPending, handleSignIn }
}

export default useSignIn