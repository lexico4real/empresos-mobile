import { OTP_URL } from "@/config/routes";
import api from "@/lib/api";
import { PostOtpData } from "@/lib/declarations";
import { useModalStore } from "@/store/modalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const usePostOtp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModal } = useModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostOtpData) => {
      return api.post("/users/otp", data);
    },
    onSuccess: async (data) => {
      if (data?.data?.secret) {
        try {
          await AsyncStorage.setItem("userSecret", data.data.secret);
          await queryClient.invalidateQueries({ queryKey: ["users"] });
          router.push(OTP_URL);
        } catch (error) {
          console.error("Failed to save user secret or navigate:", error);
          showModal("error", "An unexpected error occurred. Please try again.");
        }
      } else {
        showModal(
          "error",
          "Could not retrieve authentication details. Please try again."
        );
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log(error);
      showModal(
        "error",
        error.response?.data?.message ?? "Request failed. Please try again."
      );
    },
  });

  const handlePostOtp = (data: PostOtpData) => {
    mutate(data);
  };

  return { isPending, handlePostOtp };
};

export default usePostOtp;
