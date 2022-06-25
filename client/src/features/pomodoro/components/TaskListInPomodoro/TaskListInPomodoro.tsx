import { ITaskList, putTaskList, useTaskListStore } from "@/features";
import React, { useCallback } from "react";
import { IPomodoro, useTaskListInPomodoroStore } from "../..";
import "./TaskListInPomodoro.less";
import * as antd from "antd";
import * as icon from "@ant-design/icons";
import { ResponseError } from "@/utils";

export interface ITaskListItemProps {
  taskList: ITaskList;
  removeTaskList: (taskList: ITaskList) => void;
}

export const TaskListItem: React.FunctionComponent<ITaskListItemProps> = ({
  taskList: tl,
  removeTaskList,
}) => {
  const taskLists = useTaskListStore((taskLists) => taskLists.taskLists);
  const taskList = taskLists.get(tl.id) || ({} as ITaskList);
  const task = taskLists.get(tl.id)?.task || "";
  const pomodoro = taskLists.get(tl.id)?.pomodoro || ({} as IPomodoro);

  return (
    <antd.Card
      style={{ width: 250 }}
      actions={[
        <span>curr: {pomodoro?.current || 0}</span>,
        <span>est: {pomodoro?.estimated || 0}</span>,
        <span>act: {pomodoro?.actual || 0}</span>,
        <span>
          <antd.Tooltip title="Remove from pomodoro">
            <antd.Button
              onClick={() => removeTaskList(taskList)}
              icon={<icon.ArrowRightOutlined />}
              size="small"
              type="text"
            />
          </antd.Tooltip>
        </span>,
      ]}
      className="task-list-item"
    >
      {task}
    </antd.Card>
  );
};

export const TaskListInPomodoro: React.FunctionComponent = () => {
  const { taskLists, deleteTaskListFromPomodoro } = useTaskListInPomodoroStore();
  const taskListArray = Array.from(taskLists.values()) || [];

  const handleOnTaskRemove = useCallback(
    async (taskList: ITaskList) => {
      const res = await putTaskList({ ...taskList, userPomodoro: undefined });

      if (res instanceof ResponseError) {
        antd.message.error("There was an error while removing the task.");
        return;
      }

      const { status, data } = res;
      if (status === 200) {
        deleteTaskListFromPomodoro(data.id);
      }
    },
    [deleteTaskListFromPomodoro]
  );

  return (
    <div className="task-list-in-pomodoro">
      {taskListArray.map((task) => (
        <TaskListItem key={task.id} taskList={task} removeTaskList={handleOnTaskRemove} />
      ))}
    </div>
  );
};
