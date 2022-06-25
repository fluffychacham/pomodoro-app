import React, { useCallback, useEffect } from "react";
import * as antd from "antd";
import * as icon from "@ant-design/icons";
import { usePomodoroTaskListStore } from "../../stores";
import "./PomodoroTaskList.less";
import {
  getAllTaskList,
  postTaskList,
  TaskListList,
  TaskListSync,
  TASK_LIST_NOT_SYNCED,
  TASK_LIST_SYNCED,
  TASK_LIST_SYNCING,
  useTaskListStore,
} from "@/features";
import { ResponseError } from "@/utils";

export const PomodoroTaskListDrawer: React.FunctionComponent = () => {
  const pomodoroTaskList = usePomodoroTaskListStore();
  const { setTaskLists, addTaskList, setSyncType } = useTaskListStore();

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

  const handleOnTaskAdd = useCallback(async () => {
    setSyncType(TASK_LIST_SYNCING);
    const res = await postTaskList({
      task: "",
      pomodoro: {
        actual: 0,
        current: 0,
        estimated: 0,
      },
    });
    const errorMessage = "There was an error while adding the task.";

    if (res instanceof ResponseError) {
      setSyncType(TASK_LIST_NOT_SYNCED);
      antd.message.error(errorMessage);
      return;
    }

    const { status, data } = res;
    if (status === 201) {
      addTaskList(data);
      setSyncType(TASK_LIST_SYNCED);
    } else {
      setSyncType(TASK_LIST_NOT_SYNCED);
      antd.message.error(errorMessage);
    }
  }, [setSyncType, addTaskList]);

  return (
    <antd.Drawer
      closable
      title="Task List"
      placement="right"
      onClose={pomodoroTaskList.toggle}
      visible={pomodoroTaskList.isOpen}
      width={450}
      footer={<TaskListSync textColor="black" />}
    >
      <antd.Button
        color="primary"
        type="ghost"
        onClick={handleOnTaskAdd}
        icon={<icon.PlusOutlined />}
      >
        Add Task
      </antd.Button>
      <TaskListList />
    </antd.Drawer>
  );
};

export const PomodoroTaskListButton: React.FunctionComponent = () => {
  const pomodoroTaskList = usePomodoroTaskListStore();

  return (
    <antd.Button
      size="large"
      onClick={pomodoroTaskList.toggle}
      icon={<icon.UnorderedListOutlined />}
      className="pomodoro-task-list-button"
    />
  );
};
