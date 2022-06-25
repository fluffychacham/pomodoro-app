import create from "zustand";

export interface IPomodoroTaskListStore {
  isOpen: boolean;
  toggle: () => void;
}

export const usePomodoroTaskListStore = create<IPomodoroTaskListStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
