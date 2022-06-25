import { performRequest } from "@/utils";
import { IUserPreferences } from "../types";

export const getUserPreferences = async (id: number) => {
  return performRequest<IUserPreferences>({
    method: "get",
    url: `user/${id}/preferences`,
  });
};
