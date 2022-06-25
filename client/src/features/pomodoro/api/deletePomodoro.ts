import { performRequest } from "@/utils";

export const deletePomodoro = async (id: number) => {
  return performRequest<void>({
    method: "delete",
    url: `pomodoro/${id}`,
  });
};
