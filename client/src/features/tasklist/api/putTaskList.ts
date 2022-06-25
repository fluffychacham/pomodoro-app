import { performRequest } from "@/utils";
import { ITaskList } from "..";

export const putTaskList = async (data: ITaskList) => {
  const { id } = data;
  return await performRequest<ITaskList>({
    method: "put",
    url: `/tasklist/${id}`,
    data,
  });
};
