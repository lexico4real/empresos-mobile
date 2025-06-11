import { HOME_URL } from "@/config/routes";
import { SignInData } from "@/lib/declarations";
import { useAuth } from "@/providers/auth-context";
import { authService } from "@/services/auth.service";
import { useModalStore } from "@/store/modalStore";
import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsAuthenticated } = useAuth();
  const { setUser, setAccessToken } = useUserStore();
  const { showModal } = useModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) => {
      return authService.signIn(data);
    },
    onSuccess: async (response) => {
      if (!response.data?.accessToken) {
        throw new Error("No access token received from server");
      }

      try {
        // Save user data to store
        setUser(response.data);
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);

        // Clean up sensitive data
        await Promise.all([
          AsyncStorage.removeItem("userSecret"),
          AsyncStorage.removeItem("userPassword"),
        ]);

        // Invalidate queries and navigate
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push(HOME_URL);
        AsyncStorage.removeItem("userSecret");
        AsyncStorage.removeItem("userPassword");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } catch (error) {
        console.error("Error during sign in success handling:", error);
        showModal("error", "Failed to complete sign in process");
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error);
      showModal(
        "error",
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
