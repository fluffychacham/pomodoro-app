import { IUser } from "@/features/user/types";
import { performRequest } from "@/utils";
import { ILogin } from "../types";

export const postLogin = async (data: ILogin) => {
  return performRequest<IUser>({
    method: "post",
    url: "user/login",
    data,
  });
};
