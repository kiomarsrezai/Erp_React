import { create } from "zustand";

interface UserState {
  userName: string;
  firstName: string;
  lastName: string;
  fetched: boolean;
  chnageUserData: (data: any) => void;
  removeUserData: () => void;
}

const userStore = create<UserState>((set) => ({
  userName: "",
  firstName: "",
  lastName: "",
  fetched: false,
  chnageUserData: (data: any) => set({ ...data, fetched: true }),
  removeUserData: () =>
    set({ userName: "", firstName: "", lastName: "", fetched: false }),
}));

export default userStore;
