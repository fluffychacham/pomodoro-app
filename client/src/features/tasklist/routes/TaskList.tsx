import { Layout, Navbar } from "@/components";
import React from "react";
import { TaskListCard, TaskListList, TaskListSync } from "../components";
import * as antd from "antd";

export const TaskList: React.FunctionComponent = () => {
  return (
    <Layout header={<Navbar />}>
      <TaskListCard>
        <TaskListList />
        <antd.Divider />
        <TaskListSync textColor="black" />
      </TaskListCard>
    </Layout>
  );
};
