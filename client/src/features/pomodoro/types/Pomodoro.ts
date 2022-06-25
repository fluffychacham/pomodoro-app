export interface IPomodoro {
  id: number;
  userId: number;
  current: number;
  estimated: number;
  actual: number;
}

export const POMODORO_TAB = 1;
export const SHORT_BREAK_TAB = 2;
export const LONG_BREAK_TAB = 3;
export type PomodoroType = 1 | 2 | 3;
