import { performRequest } from "@/utils";
import { IUserPomodoro } from "../types";

export const putUserPomodoro = async (data: IUserPomodoro) => {
  return await performRequest({
    method: "put",
    url: `user-pomodoro/${data.id}`,
    data,
  });
};
