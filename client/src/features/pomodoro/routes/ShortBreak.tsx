import { CircleProgressBar, Layout, Navbar } from "@/components";
import { userUserPreferencesStore } from "@/features";
import { convertMinutesToMilliseconds } from "@/utils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { POMODORO_BASE_PATH, POMODORO_PATH, SHORT_BREAK_TAB } from "..";
import {
  NavRightContent,
  PomodoroControls,
  PomodoroTabs,
  PomodoroTaskListDrawer,
} from "../components";
import { usePomodoroStore, usePomodoroTabStore } from "../stores";

const DEFAULT_SHORT_BREAK_DURATION = 5; // in minutes

export const ShortBreak: React.FunctionComponent = () => {
  const setActiveTabId = usePomodoroTabStore((state) => state.setActiveTabId);

  const navigate = useNavigate();

  const userPreferences = userUserPreferencesStore((state) => state.preferences);

  const duration = usePomodoroStore((state) => state.duration);
  const setDuration = usePomodoroStore((state) => state.setDuration);

  const isRunning = usePomodoroStore((state) => state.isRunning);
  const setIsRunning = usePomodoroStore((state) => state.setIsRunning);

  useEffect(() => {
    setActiveTabId(SHORT_BREAK_TAB);
  }, [setActiveTabId]);

  useEffect(() => {
    if (!!userPreferences) {
      setDuration(convertMinutesToMilliseconds(userPreferences.pomodoroBreakDuration));
    }
  }, [userPreferences, setDuration]);

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
          userPreferences?.pomodoroBreakDuration || DEFAULT_SHORT_BREAK_DURATION
        )}
      />
      <PomodoroControls
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onNext={() => {
          setDuration(
            convertMinutesToMilliseconds(
              userPreferences?.pomodoroBreakDuration || DEFAULT_SHORT_BREAK_DURATION
            )
          );
          setIsRunning(false);
          // TODO - navigate to next break depending on pomodoro count
          navigate(`${POMODORO_BASE_PATH}${POMODORO_PATH}`);
        }}
        onReset={() => {
          setDuration(
            convertMinutesToMilliseconds(
              userPreferences?.pomodoroBreakDuration || DEFAULT_SHORT_BREAK_DURATION
            )
          );
          setIsRunning(false);
        }}
        isRunning={isRunning}
      />
    </Layout>
  );
};
