import create from "zustand";

export interface IPomodoroStore {
  duration: number; // in minutes
  setDuration: (duration: number) => void;

  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

export const usePomodoroStore = create<IPomodoroStore>((set) => ({
  duration: 0,
  setDuration: (duration: number) => set(() => ({ duration })),

  isRunning: false,
  setIsRunning: (isRunning: boolean) => set(() => ({ isRunning })),
}));
