import { ResponseError } from "@/utils";
import { useCallback } from "react";
import { getUserPreferences } from "..";
import { userUserPreferencesStore } from "../stores";
import { IUser } from "../types";

export const useUserPreferences = () => {
  const preferences = userUserPreferencesStore((state) => state.preferences);
  const setUserPreferences = userUserPreferencesStore((state) => state.setPreferences);

  const init = useCallback(
    async (user: IUser) => {
      if (user === undefined) return;
      const { id } = user;
      const res = await getUserPreferences(id);
      if (res instanceof ResponseError) return;

      const { status, data } = res;
      if (status === 200) {
        setUserPreferences(data);
      } else {
        setUserPreferences(undefined);
      }
    },
    [setUserPreferences]
  );

  return { preferences, init };
};
