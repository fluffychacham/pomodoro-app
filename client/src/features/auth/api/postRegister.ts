import { IUser } from "@/features/user/types";
import { performRequest } from "@/utils";
import { IRegister } from "../types";

export const postRegister = async (data: IRegister) => {
  return performRequest<IUser>({
    method: "post",
    url: "user/new",
    data,
  });
};
