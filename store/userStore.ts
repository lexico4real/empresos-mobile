import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserAccount {
  id: string;
  accountNumber: string;
  balance: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountStatus: string;
  photo: string | null;
  phoneNumber: string;
  failedLoginAttempts: number;
  userRole: string | null;
  accounts: UserAccount[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 