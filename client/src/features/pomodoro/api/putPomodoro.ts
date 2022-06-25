import { performRequest } from "@/utils";
import { IPomodoro } from "../types/Pomodoro";

export const putPomodoro = async (data: IPomodoro) => {
  return performRequest<IPomodoro>({
    method: "put",
    url: `pomodoro`,
    data,
  });
};
