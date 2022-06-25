import { IPomodoro, useTaskListInPomodoroStore, useUserStore } from "@/features";
import { IUserPomodoro } from "@/features/user/types";
import { ResponseError } from "@/utils";
import * as icon from "@ant-design/icons";
import * as antd from "antd";
import React, { useCallback, useMemo, useRef } from "react";
import { TaskListCheckbox, TaskListInput, TaskListInputNumber } from "..";
import { ITaskList, TASK_LIST_NOT_SYNCED, TASK_LIST_SYNCED, TASK_LIST_SYNCING } from "../..";
import { deleteTaskList, postTaskList, putTaskList } from "../../api";
import { useTaskListStore } from "../../stores/useTaskListStore";
import "./TaskListList.less";

const test: Set<number> = new Set();

export const TaskListList: React.FunctionComponent = () => {
  const { taskLists, addTaskList, updateTaskList, setSyncType, removeTaskList } =
    useTaskListStore();
  const taskListArray = Array.from(taskLists.values()) || [];
  const inputRef = useRef<any>(null);
  const user = useUserStore((user) => user.user);
  const userPomodoro = useMemo(
    () => user?.userPomodoro || ({} as IUserPomodoro),
    [user?.userPomodoro]
  );
  const addTaskListToPomodoro = useTaskListInPomodoroStore(
    (taskListInPomodoro) => taskListInPomodoro.addTaskListToPomodoro
  );

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
      inputRef.current.focus({
        cursor: "start",
      });
      setSyncType(TASK_LIST_SYNCED);
    } else {
      setSyncType(TASK_LIST_NOT_SYNCED);
      antd.message.error(errorMessage);
    }
  }, [setSyncType, addTaskList]);

  const handleOnUpdateTask = useCallback(
    async (taskList: ITaskList) => {
      setSyncType(TASK_LIST_SYNCING);
      const res = await putTaskList(taskList);
      const errorMessage = "There was an error while updating the task.";

      if (res instanceof ResponseError) {
        antd.message.error(errorMessage);
        setSyncType(TASK_LIST_NOT_SYNCED);
        return;
      }

      const { status } = res;
      if (status === 200) {
        updateTaskList(taskList);
        setSyncType(TASK_LIST_SYNCED);
      } else {
        setSyncType(TASK_LIST_NOT_SYNCED);
        antd.message.error(errorMessage);
      }
    },
    [setSyncType, updateTaskList]
  );

  const handleOnAddTaskToPomodoro = useCallback(
    async (taskList: ITaskList) => {
      if (!userPomodoro) return;
      // TODO - add task list to user pomodoro
      console.log(userPomodoro);
      console.log(taskList);
      /* const res = await putUserPomodoro({
        ...userPomodoro,
        taskLists: [...userPomodoro.taskLists, taskList],
      }); */
      const res = await putTaskList({
        ...taskList,
        userPomodoro,
      });
      if (res instanceof ResponseError) {
        antd.message.error("There was an error while adding the task.");
        return;
      }
      if (res.status === 200) {
        addTaskListToPomodoro(taskList);
      }
    },
    [userPomodoro, addTaskListToPomodoro]
  );

  const handleOnDeleteTask = useCallback(
    async (id: number) => {
      const res = await deleteTaskList(id);
      const errorMessage = "There was an error while deleting the task.";

      if (res instanceof ResponseError) {
        antd.message.error(errorMessage);
        return;
      }

      const { status } = res;
      if (status === 200) {
        removeTaskList(id);
        test.delete(id);
      } else {
        antd.message.error(errorMessage);
      }
    },
    [removeTaskList]
  );

  return (
    <>
      <antd.List
        className="task-list-list"
        dataSource={taskListArray}
        renderItem={(task) => (
          <antd.List.Item className="task-list-list-item">
            <TaskListCheckbox
              delayedOnChange={(done) => handleOnUpdateTask({ ...task, done })}
              onChange={(done) => updateTaskList({ ...task, done })}
              checked={task.done}
              debounceDelay={1000}
            />
            <TaskListInput<string>
              ref={inputRef}
              value={task.task}
              delayedOnChange={(value) => handleOnUpdateTask({ ...task, task: value })}
              onChange={(value) => updateTaskList({ ...task, task: value })}
              done={task.done}
              debounceDelay={1000}
              onEnterPressed={() => handleOnTaskAdd()}
            />
            <antd.Space size="middle" className="task-list-list-footer">
              <antd.Button onClick={() => handleOnAddTaskToPomodoro(task)}>
                <antd.Tooltip title="Add to current pomodoro">
                  <icon.ArrowLeftOutlined />
                </antd.Tooltip>
              </antd.Button>
              <TaskListInputNumber
                prefix="est:"
                onChange={(estimated) => {
                  handleOnUpdateTask({
                    ...task,
                    pomodoro: { ...(task?.pomodoro || ({} as IPomodoro)), estimated },
                  });
                  updateTaskList({
                    ...task,
                    pomodoro: { ...(task?.pomodoro || ({} as IPomodoro)), estimated },
                  });
                  // updateTaskList({ ...task, pomodoro: { ...task.pomodoro, estimated } });
                }}
                value={task.pomodoro?.estimated || 0}
              />
              <antd.Space size="small">curr:{task.pomodoro?.current || 0}</antd.Space>
              <antd.Space size="small">act:{task.pomodoro?.actual || 0}</antd.Space>
              <antd.Button
                onClick={() => handleOnDeleteTask(task.id)}
                icon={<icon.DeleteOutlined />}
                size="small"
                type="ghost"
              />
            </antd.Space>
          </antd.List.Item>
        )}
      />
    </>
  );
};
