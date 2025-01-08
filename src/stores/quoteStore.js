import { create } from 'zustand';


const useQuotesStore = create((set, get) => ({
  items: [],

  // Add if not exists, remove if exists
  toggleItem: (item) => {
    set((state) => ({
      items: state.items.includes(item)
        ? state.items.filter((i) => i !== item) // Remove if exists
        : [...state.items, item], // Add if not exists
    }));
  },

  // Check if string exists
  exists: (item) => {
    return get().items.includes(item);
  },

  // Remove specific string
  removeItem: (item) => {
    set((state) => ({
      items: state.items.filter((i) => i !== item),
    }));
  },
}));

export default useQuotesStore;