import { create } from 'zustand';
import type { User } from '../types/User';

interface UserState {
  userData: User | null;
  setUserData: (data: Partial<User>) => void;
  setFullUserData: (data: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (data) =>
    set((state) => ({
      userData: state.userData ? { ...state.userData, ...data } : state.userData,
    })),
  setFullUserData: (data) => set({ userData: data }),
}));