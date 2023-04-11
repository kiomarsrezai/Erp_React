import { create } from "zustand";

interface BearState {
  normlize: boolean;
  toggleNormlize: () => void;
}

const useLayoutStore = create<BearState>((set) => ({
  normlize: false,
  toggleNormlize: () => set((state) => ({ normlize: !state.normlize })),
}));

export default useLayoutStore;
