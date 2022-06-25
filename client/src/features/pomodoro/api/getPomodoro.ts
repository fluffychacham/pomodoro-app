import { performRequest } from "@/utils";
import { IPomodoro } from "../types/Pomodoro";

export const getPomodoroById = async (id: number) => {
  return performRequest<IPomodoro>({
    method: "get",
    url: `pomodoro/${id}`,
  });
};
