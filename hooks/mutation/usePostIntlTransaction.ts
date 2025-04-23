import { HOME_URL } from "@/config/routes"
import api from "@/lib/api"
import { PostIntlTransactionData } from "@/lib/declarations"
import { useModalStore } from "@/store/modalStore"
import useTransferStore from "@/store/transferStore"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

const usePostIntlTransaction = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showModal } = useModalStore()
  const { resetTransfer } = useTransferStore()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostIntlTransactionData) => {
      return api.post('/transaction/transfer/intl', data)
    },
    onSuccess: (data) => {
      if (data) {
        showModal('success', 'Transaction created successfully!')
        resetTransfer()
        setTimeout(() => {
          router.push(HOME_URL)
        }, 2000)
      }
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
    onError: (error: { response: { data: { message: string } } }) => {
      showModal('error', error.response.data.message)
    }
  })

  const handlePostIntlTransaction = (data: PostIntlTransactionData) => {
    mutate(data)
  }

  return { isPending, handlePostIntlTransaction }
}

export default usePostIntlTransaction