import { create } from 'zustand';

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: UserProps[];
  setUser: (user: UserProps) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: [],
  setUser: (user) => set((state) => ({ user: [...state.user, user] })),
}));
