import { performRequest } from "@/utils";
import { ICreateTaskList, ITaskList } from "..";

export const postTaskList = async (taskList: ICreateTaskList) => {
  return await performRequest<ITaskList>({
    method: "POST",
    url: "/tasklist/new",
    data: taskList,
  });
};
