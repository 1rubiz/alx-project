import { create } from 'zustand';


const useUserStore = create((set) => ({
  user: '',

  // Set user
  setUser: (item) => {
    set({ user: item });
  },
}));

export default useUserStore;