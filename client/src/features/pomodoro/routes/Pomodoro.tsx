import { CircleProgressBar, Layout, Navbar } from "@/components";
import { userUserPreferencesStore, useUserPreferences, useUserStore } from "@/features/user";
import { convertMinutesToMilliseconds } from "@/utils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { POMODORO_BASE_PATH, SHORT_BREAK_PATH } from ".";
import { POMODORO_TAB } from "..";
import { NavRightContent, PomodoroControls, PomodoroTabs, TaskListInPomodoro } from "../components";
import { PomodoroTaskListDrawer } from "../components";
import { usePomodoroStore, usePomodoroTabStore } from "../stores";

const DEFAULT_POMODORO_DURATION = 25; // in minutes

export const Pomodoro: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();
  const { init: preferencesInit } = useUserPreferences();
  const userPreferences = userUserPreferencesStore((state) => state.preferences);

  const setActiveTabId = usePomodoroTabStore((state) => state.setActiveTabId);

  const duration = usePomodoroStore((state) => state.duration);
  const setDuration = usePomodoroStore((state) => state.setDuration);

  const isRunning = usePomodoroStore((state) => state.isRunning);
  const setIsRunning = usePomodoroStore((state) => state.setIsRunning);

  useEffect(() => {
    setActiveTabId(POMODORO_TAB);
  }, [setActiveTabId]);

  useEffect(() => {
    if (!!userPreferences) {
      setDuration(convertMinutesToMilliseconds(userPreferences.pomodoroDuration));
    } else {
      !!user && preferencesInit(user);
    }
  }, [userPreferences, user, preferencesInit, setDuration]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        setDuration(duration - 1000);
      }
    }, 1000);

    if (!isRunning) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, duration, setDuration]);

  return (
    <Layout
      contentDirection="column"
      header={<Navbar centerContent={<PomodoroTabs />} rightContent={<NavRightContent />} />}
    >
      <PomodoroTaskListDrawer />
      <CircleProgressBar
        value={duration}
        max={convertMinutesToMilliseconds(
          userPreferences?.pomodoroDuration || DEFAULT_POMODORO_DURATION
        )}
      />
      <PomodoroControls
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onNext={() => {
          setDuration(
            convertMinutesToMilliseconds(
              userPreferences?.pomodoroDuration || DEFAULT_POMODORO_DURATION
            )
          );
          setIsRunning(false);
          // TODO - navigate to next break depending on pomodoro count
          navigate(`${POMODORO_BASE_PATH}${SHORT_BREAK_PATH}`);
        }}
        onReset={() => {
          setDuration(
            convertMinutesToMilliseconds(
              userPreferences?.pomodoroDuration || DEFAULT_POMODORO_DURATION
            )
          );
          setIsRunning(false);
        }}
        isRunning={isRunning}
      />
      <TaskListInPomodoro />
    </Layout>
  );
};
