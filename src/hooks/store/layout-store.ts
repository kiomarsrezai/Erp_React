import { create } from "zustand";

interface LayoutState {
  normalize: boolean;
  toggleNormalize: () => void;

  activeSidenavIndex: number | null;
  onChangeActiveSidenav: (i: number) => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  normalize: false,
  toggleNormalize: () => {
    set((state) => ({ normalize: !state.normalize }));
  },

  activeSidenavIndex: null,
  onChangeActiveSidenav: (i: number) => {
    set((state) => ({
      ...state,
      activeSidenavIndex: state.activeSidenavIndex === i ? null : i,
    }));
  },
}));

export default useLayoutStore;
