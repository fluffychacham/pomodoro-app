import create from "zustand";

export interface AppLoaderStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAppLoaderStore = create<AppLoaderStore>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set((state) => ({ isLoading })),
}));
