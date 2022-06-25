import { useTaskListInPomodoroStore } from "@/features/pomodoro/stores/useTaskListInPomodoroStore";
import { useAuthStore } from "@/stores";
import { ResponseError } from "@/utils";
import { useCallback } from "react";
import { getSelf } from "..";
import { useUserStore } from "../stores/useUserStore";
import { IUser } from "../types";

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setTaskListsInPomodoro = useTaskListInPomodoroStore(
    (state) => state.setTaskListsInPomodoro
  );

  const init = useCallback(async (): Promise<void | IUser> => {
    const self = await getSelf();
    if (self instanceof ResponseError) return;

    const { status, data } = self;
    if (status === 200) {
      setUser(data);
      if (data.userPomodoro !== undefined) {
        setTaskListsInPomodoro(data.userPomodoro.taskLists);
      }
      setIsAuthenticated(true);
      return data;
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
      return;
    }
  }, [setUser, setIsAuthenticated, setTaskListsInPomodoro]);

  return { user, init };
};
