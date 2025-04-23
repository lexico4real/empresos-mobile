import { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';

interface ModalState {
  visible: boolean;
  type: 'success' | 'error' | 'loading';
  message: string;
}

interface UseStatusModalProps {
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export const useStatusModal = ({
  successMessage = 'Operation successful!',
  errorMessage = 'Something went wrong!',
  loadingMessage = 'Processing...',
}: UseStatusModalProps = {}) => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    type: 'loading',
    message: '',
  });

  const showModal = (type: ModalState['type'], message?: string) => {
    setModalState({
      visible: true,
      type,
      message: message || (type === 'success' ? successMessage : type === 'error' ? errorMessage : loadingMessage),
    });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, visible: false }));
  };

  const handleMutation = (mutation: UseMutationResult) => {
    if (mutation.isPending) {
      showModal('loading');
    } else if (mutation.isSuccess) {
      showModal('success');
    } else if (mutation.isError) {
      showModal('error');
    }
  };

  return {
    modalState,
    showModal,
    hideModal,
    handleMutation,
  };
}; 