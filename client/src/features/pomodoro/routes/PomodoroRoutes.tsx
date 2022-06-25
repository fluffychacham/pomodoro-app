import { useMenuStore } from "@/stores";
import { lazyImport } from "@/utils";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { POMODORO_TAB } from "..";

const { Pomodoro } = lazyImport(() => import("./Pomodoro"), "Pomodoro");
const { ShortBreak } = lazyImport(() => import("./ShortBreak"), "ShortBreak");
const { LongBreak } = lazyImport(() => import("./LongBreak"), "LongBreak");

export const POMODORO_BASE_PATH = "/pomodoro";
export const POMODORO_PATH = "/";
export const SHORT_BREAK_PATH = "/short-break";
export const LONG_BREAK_PATH = "/long-break";

export const PomodoroRoutes: React.FunctionComponent = () => {
  const setActiveNavId = useMenuStore((state) => state.setActiveNavId);

  useEffect(() => {
    setActiveNavId(POMODORO_TAB);
  }, [setActiveNavId]);

  return (
    <Routes>
      <Route path={`${POMODORO_BASE_PATH}${POMODORO_PATH}`} element={<Pomodoro />} />
      <Route path={`${POMODORO_BASE_PATH}${SHORT_BREAK_PATH}`} element={<ShortBreak />} />
      <Route path={`${POMODORO_BASE_PATH}${LONG_BREAK_PATH}`} element={<LongBreak />} />
      <Route path="/*" element={<Navigate to={`${POMODORO_BASE_PATH}${POMODORO_PATH}`} />} />
    </Routes>
  );
};
