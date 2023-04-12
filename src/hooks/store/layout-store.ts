import { create } from "zustand";

interface LayoutState {
  normlize: boolean;
  toggleNormlize: () => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  normlize: false,
  toggleNormlize: () => set((state) => ({ normlize: !state.normlize })),
}));

export default useLayoutStore;
