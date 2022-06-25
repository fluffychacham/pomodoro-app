import { ITaskList } from "@/features";
import create from "zustand";

export interface ITaskListInPomodoroStore {
  taskLists: Map<number, ITaskList>;
  setTaskListsInPomodoro: (taskLists: ITaskList[]) => void;
  addTaskListToPomodoro: (taskList: ITaskList) => void;
  updateTaskListInPomodoro: (taskList: ITaskList) => void;
  deleteTaskListFromPomodoro: (id: number) => void;
}

export const useTaskListInPomodoroStore = create<ITaskListInPomodoroStore>((set) => ({
  taskLists: new Map(),
  setTaskListsInPomodoro: (taskLists: ITaskList[]) =>
    set(() => ({ taskLists: new Map(taskLists.map((taskList) => [taskList.id, taskList])) })),
  addTaskListToPomodoro: (taskList: ITaskList) =>
    set((state) => ({ taskLists: state.taskLists.set(taskList.id, taskList) })),
  updateTaskListInPomodoro: (taskList: ITaskList) =>
    set((state) => ({ taskLists: state.taskLists.set(taskList.id, taskList) })),
  deleteTaskListFromPomodoro: (id: number) =>
    set((state) => {
      state.taskLists.delete(id);
    }),
}));
