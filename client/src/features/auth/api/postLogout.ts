import { performRequest } from "@/utils";

export const postLogout = async () => {
  return performRequest<void>({
    method: "POST",
    url: "user/logout",
  });
};
