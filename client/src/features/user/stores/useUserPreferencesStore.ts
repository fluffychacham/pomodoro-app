import create from "zustand";
import { IUserPreferences } from "../types";

export interface IUserPreferencesStore {
  preferences?: IUserPreferences;
  setPreferences: (preferences?: IUserPreferences) => void;
}

export const userUserPreferencesStore = create<IUserPreferencesStore>((set) => ({
  preferences: undefined,
  setPreferences: (preferences?: IUserPreferences) => set(() => ({ preferences })),
}));
