import { Tabs } from "@/components";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  POMODORO_TAB,
  SHORT_BREAK_TAB,
  LONG_BREAK_TAB,
  POMODORO_PATH,
  POMODORO_BASE_PATH,
  SHORT_BREAK_PATH,
  LONG_BREAK_PATH,
} from "../..";
import { usePomodoroTabStore } from "../../stores";

export const PomodoroTabs: React.FunctionComponent = () => {
  const pomodoroStore = usePomodoroTabStore();
  const navigate = useNavigate();

  const handleTabClick = (id: number, path: string) => {
    pomodoroStore.setActiveTabId(id);
    navigate(`${POMODORO_BASE_PATH}${path}`);
  };

  return (
    <Tabs
      activeTabId={pomodoroStore.activeTabId}
      tabs={[
        {
          id: POMODORO_TAB,
          title: "Pomodoro",
          onClick: () => handleTabClick(POMODORO_TAB, POMODORO_PATH),
        },
        {
          id: SHORT_BREAK_TAB,
          title: "Short Break",
          onClick: () => handleTabClick(SHORT_BREAK_TAB, SHORT_BREAK_PATH),
        },
        {
          id: LONG_BREAK_TAB,
          title: "Long Break",
          onClick: () => handleTabClick(LONG_BREAK_TAB, LONG_BREAK_PATH),
        },
      ]}
    />
  );
};
