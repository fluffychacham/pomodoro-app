import create from "zustand";

export interface IMenuStore {
  isOpen: boolean;
  toggleMenu: () => void;

  activeNavId: number;
  setActiveNavId: (id: number) => void;
}

export const useMenuStore = create<IMenuStore>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),

  activeNavId: 1,
  setActiveNavId: (id: number) => set(() => ({ activeNavId: id })),
}));
