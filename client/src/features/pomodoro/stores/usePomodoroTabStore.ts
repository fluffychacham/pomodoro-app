import create from "zustand";
import { POMODORO_TAB } from "..";

export interface IPomodoroTabStore {
  activeTabId: number;
  setActiveTabId: (id: number) => void;
}

export const usePomodoroTabStore = create<IPomodoroTabStore>((set) => ({
  activeTabId: POMODORO_TAB,
  setActiveTabId: (id: number) => set(() => ({ activeTabId: id })),
}));
