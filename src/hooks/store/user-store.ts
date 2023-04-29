import { create } from "zustand";

interface UserState {
  userName: string;
  firstName: string;
  lastName: string;
  chnageUserData: (data: any) => void;
}

const userStore = create<UserState>((set) => ({
  userName: "",
  firstName: "",
  lastName: "",
  chnageUserData: (data: any) => set(data),
}));

export default userStore;
