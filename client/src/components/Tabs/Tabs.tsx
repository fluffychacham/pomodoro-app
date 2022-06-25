import React from "react";
import * as antd from "antd";
import "./Tabs.less";

export interface ITab {
  id: number;
  title: string;
  onClick: () => void;
}

export interface ITabsProps {
  tabs: ITab[];
  activeTabId: number;
}

export const Tabs: React.FunctionComponent<ITabsProps> = ({ tabs, activeTabId }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <antd.Button
          onClick={tab.onClick}
          data-active={activeTabId === tab.id}
          key={tab.id}
          className="tab-button"
        >
          {tab.title}
        </antd.Button>
      ))}
    </div>
  );
};
