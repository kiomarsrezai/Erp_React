import { create } from "zustand";

interface UserState {
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  fetched: boolean;
  chnageUserData: (data: any) => void;
  removeUserData: () => void;
}

const userStore = create<UserState>((set) => ({
  userName: "",
  firstName: "",
  lastName: "",
  bio: "",
  fetched: false,
  chnageUserData: (data: any) => set({ ...data, fetched: true }),
  removeUserData: () =>
    set({ userName: "", firstName: "", lastName: "", bio: "", fetched: false }),
}));

export default userStore;
