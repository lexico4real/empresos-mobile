import { create } from 'zustand';

interface ModalState {
  visible: boolean;
  type: 'success' | 'error' | 'loading';
  message: string;
  showModal: (type: 'success' | 'error' | 'loading', message?: string) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  visible: false,
  type: 'loading',
  message: '',
  showModal: (type, message = '') => set({ visible: true, type, message }),
  hideModal: () => set({ visible: false }),
})); 