import * as icon from "@ant-design/icons";
import * as antd from "antd";
import React, { CSSProperties } from "react";
import { TASK_LIST_NOT_SYNCED, TASK_LIST_SYNCED, TASK_LIST_SYNCING } from "../..";
import { useTaskListStore } from "../../stores/useTaskListStore";

export interface ITaskListSyncProps {
  textColor?: CSSProperties["color"];
}

export const TaskListSync: React.FunctionComponent<ITaskListSyncProps> = ({
  textColor = "white",
}) => {
  const { syncType } = useTaskListStore();

  return (
    <>
      {syncType === TASK_LIST_SYNCED && (
        <>
          <antd.Space>
            <span style={{ color: textColor }}>Synced</span>
            <icon.CheckCircleTwoTone twoToneColor="green" />
          </antd.Space>
        </>
      )}
      {syncType === TASK_LIST_NOT_SYNCED && (
        <>
          <antd.Space>
            <span style={{ color: textColor }}>Not Synced</span>
            <icon.CloseCircleTwoTone twoToneColor="red" />
          </antd.Space>
        </>
      )}
      {syncType === TASK_LIST_SYNCING && (
        <>
          <antd.Space>
            <span style={{ color: textColor }}>Syncing...</span>
            <icon.SyncOutlined spin />
          </antd.Space>
        </>
      )}
    </>
  );
};
