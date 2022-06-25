import { performRequest } from "@/utils";

export const deleteTaskList = async (taskListId: number) => {
  return await performRequest<void>({
    method: "delete",
    url: `/tasklist/${taskListId}`,
  });
};
