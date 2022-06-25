import create from "zustand";
import { ITaskList, TaskListSyncStatusType, TASK_LIST_SYNCED } from "..";

export interface ITaskListStore {
  taskLists: Map<number, ITaskList>;
  setTaskLists: (taskLists: ITaskList[]) => void;
  addTaskList: (taskList: ITaskList) => void;
  updateTaskList: (taskList: ITaskList) => void;
  removeTaskList: (id: number) => void;

  syncType: TaskListSyncStatusType;
  setSyncType: (syncType: TaskListSyncStatusType) => void;
}

export const useTaskListStore = create<ITaskListStore>((set) => ({
  taskLists: new Map(),
  setTaskLists: (taskLists: ITaskList[]) =>
    set(() => ({ taskLists: new Map(taskLists.map((taskList) => [taskList.id, taskList])) })),
  addTaskList: (taskList: ITaskList) =>
    set((state) => ({ taskLists: state.taskLists.set(taskList.id, taskList) })),
  updateTaskList: (taskList: ITaskList) =>
    set((state) => ({ taskLists: new Map(state.taskLists.set(taskList.id, taskList)) })),
  removeTaskList: (id: number) =>
    set((state) => {
      state.taskLists.delete(id);
    }),

  syncType: TASK_LIST_SYNCED,
  setSyncType: (syncType: TaskListSyncStatusType) => set(() => ({ syncType })),
}));
