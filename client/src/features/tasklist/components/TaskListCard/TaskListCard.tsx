import React from "react";
import * as antd from "antd";
import * as icon from "@ant-design/icons";
import { useTaskListStore } from "../../stores/useTaskListStore";
import { ResponseError } from "@/utils";
import { TASK_LIST_SYNCING, TASK_LIST_NOT_SYNCED, TASK_LIST_SYNCED } from "../..";
import { postTaskList } from "../../api";

export const TaskListCard: React.FunctionComponent = ({ children }) => {
  const { addTaskList, setSyncType } = useTaskListStore();

  const handleOnTaskAdd = async () => {
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
  };

  return (
    <antd.Card
      title="Task List"
      style={{
        maxWidth: 500,
        width: "100%",
      }}
      extra={
        <antd.Button onClick={handleOnTaskAdd} icon={<icon.PlusOutlined />}>
          Add Task
        </antd.Button>
      }
    >
      {children}
    </antd.Card>
  );
};
