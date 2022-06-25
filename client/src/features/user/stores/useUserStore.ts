import create from "zustand";
import { IUser } from "../types";

export interface IUserStore {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: undefined,
  setUser: (user?: IUser) => set({ user }),
}));
