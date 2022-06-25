import {
  AUTH_BASE_PATH,
  LOGIN_PATH,
  postLogout,
  TASK_LIST_BASE_PATH,
  TASK_LIST_TAB,
  useUserStore,
  POMODORO_BASE_PATH,
  POMODORO_PATH,
  POMODORO_TAB,
} from "@/features";
import { useAuthStore, useMenuStore } from "@/stores";
import * as icon from "@ant-design/icons";
import * as antd from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.less";

export const MenuDrawer: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const menu = useMenuStore();
  const setUser = useUserStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const handleOnLogout = async () => {
    await postLogout();
    setUser(undefined);
    setIsAuthenticated(false);
    menu.toggleMenu();
    navigate(`${AUTH_BASE_PATH}${LOGIN_PATH}`);
  };

  const handleOnPomodoroClick = () => {
    if (menu.activeNavId === POMODORO_TAB) return;
    menu.toggleMenu();
    navigate(`${POMODORO_BASE_PATH}${POMODORO_PATH}`);
  };

  const handleOnTaskListClick = () => {
    if (menu.activeNavId === TASK_LIST_TAB) return;
    menu.toggleMenu();
    navigate(`${TASK_LIST_BASE_PATH}`);
  };

  return (
    <antd.Drawer
      closable
      placement="left"
      title="Menu"
      onClose={menu.toggleMenu}
      visible={menu.isOpen}
      footer={
        <>
          <antd.Button onClick={handleOnLogout} icon={<icon.LogoutOutlined />}>
            Logout
          </antd.Button>
        </>
      }
    >
      <antd.Button
        data-active={menu.activeNavId === POMODORO_TAB}
        icon={<icon.FieldTimeOutlined />}
        onClick={handleOnPomodoroClick}
        size="large"
      >
        Pomodoro
      </antd.Button>
      <antd.Button
        data-active={menu.activeNavId === TASK_LIST_TAB}
        icon={<icon.UnorderedListOutlined />}
        onClick={handleOnTaskListClick}
        size="large"
      >
        Task List
      </antd.Button>
    </antd.Drawer>
  );
};

export const MenuButton: React.FunctionComponent = () => {
  const menu = useMenuStore();

  return (
    <antd.Button
      size="large"
      className="menu-button"
      onClick={menu.toggleMenu}
      icon={<icon.MenuOutlined />}
    />
  );
};
