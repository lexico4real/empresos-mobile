import { HOME_URL } from "@/config/routes";
import { SignInData } from "@/lib/declarations";
import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();
  const { setUser, setAccessToken } = useUserStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) => {
      return authService.signIn(data);
    },
    onSuccess: (response) => {
      if (response.data?.accessToken) {
        console.log("data", response.data);
        // Save user data to store
        setUser(response.data);
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
        router.push(HOME_URL);
        AsyncStorage.removeItem("userSecret");
        AsyncStorage.removeItem("userPassword");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      Alert.alert(
        "Error",
        error?.response?.data?.message ?? "Failed to sign in. Please try again."
      );
    },
  });

  const handleSignIn = (data: SignInData) => {
    mutate(data);
  };

  return { isPending, handleSignIn };
};

export default useSignIn;
