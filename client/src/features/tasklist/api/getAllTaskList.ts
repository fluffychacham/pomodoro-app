import { performRequest } from "@/utils";
import { ITaskList } from "..";

export const getAllTaskList = async () => {
  return await performRequest<ITaskList[]>({
    method: "GET",
    url: "/tasklist/all",
  });
};
