import { useMenuStore } from "@/stores";
import { lazyImport, ResponseError } from "@/utils";
import * as antd from "antd";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { TASK_LIST_TAB } from "..";
import { getAllTaskList } from "../api";
import { useTaskListStore } from "../stores/useTaskListStore";

const { TaskList } = lazyImport(() => import("./TaskList"), "TaskList");

export const TASK_LIST_BASE_PATH = "/task-list";
export const TASK_LIST_PATH = "/";

export const TaskListRoutes: React.FunctionComponent = () => {
  const setActiveNavId = useMenuStore((state) => state.setActiveNavId);
  const { setTaskLists } = useTaskListStore();

  useEffect(() => {
    setActiveNavId(TASK_LIST_TAB);
  }, [setActiveNavId]);

  useEffect(() => {
    (async () => {
      const res = await getAllTaskList();
      const errorMessage = "There was an error while loading the task list.";
      if (res instanceof ResponseError) {
        antd.message.error(errorMessage);
        return;
      }

      const { status, data } = res;
      if (status === 200) {
        setTaskLists(data);
      } else {
        antd.message.error(errorMessage);
      }
    })();
  }, [setTaskLists]);

  return (
    <Routes>
      <Route path={`${TASK_LIST_PATH}`} element={<TaskList />} />
    </Routes>
  );
};
