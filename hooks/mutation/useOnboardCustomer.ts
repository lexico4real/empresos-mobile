import { SIGN_IN_URL } from "@/config/routes";
import api from "@/lib/api";
import { SignUpFormData } from "@/lib/declarations";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useOnboardCustomer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModal } = useModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpFormData) => {
      return api.post("/users/customer", data);
    },
    onSuccess: (data) => {
      if (data) {
        showModal(
          "success",
          "Account created successfully! Please sign in to continue."
        );
        router.push(SIGN_IN_URL);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      showModal(
        "error",
        error.response.data.message ??
          "Failed to onboard customer. Please try again."
      );
    },
  });

  const handleOnboardCustomer = (data: SignUpFormData) => {
    mutate(data);
  };

  return { isPending, handleOnboardCustomer };
};

export default useOnboardCustomer;
