import { performRequest } from "@/utils";
import { ITaskList } from "..";

export const getTaskListById = async (id: number) => {
  return await performRequest<ITaskList>({
    method: "GET",
    url: `/tasklist/${id}`,
  });
};
