import { performRequest } from "@/utils";
import { IUser } from "../types";

export const getSelf = async () => {
  return await performRequest<IUser>({
    method: "get",
    url: "user/self",
  });
};
