import React from "react";
import "./LoginForm.less";
import * as antd from "antd";
import * as icon from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AUTH_BASE_PATH, REGISTER_PATH } from "../..";
import { ILogin } from "../../types";
import { useUserStore } from "@/features/user";
import { useAuthStore } from "@/stores";
import { postLogin } from "../../";
import { ResponseError } from "@/utils";

export const LoginForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const user = useUserStore();
  const auth = useAuthStore();

  const handleOnFinish = async (value: ILogin) => {
    const login = await postLogin({ username: value.username, password: value.password });
    const errorMessage = "Incorrect username or password.";

    if (login instanceof ResponseError) {
      console.error(errorMessage);
      antd.message.error(errorMessage);
      return;
    }

    const { status, data } = login;
    if (status === 201) {
      user.setUser(data);
      auth.setIsAuthenticated(true);
    } else {
      user.setUser(undefined);
      auth.setIsAuthenticated(false);
      console.error(errorMessage);
      antd.message.error(errorMessage);
    }
  };

  return (
    <antd.Form
      name="login"
      className="auth-login-form"
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
    >
      <antd.Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <antd.Input
          prefix={<icon.UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          autoComplete="current-username"
        />
      </antd.Form.Item>
      <antd.Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <antd.Input
          prefix={<icon.LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </antd.Form.Item>
      <antd.Form.Item name="remember" valuePropName="checked">
        <antd.Checkbox>Remember me</antd.Checkbox>
      </antd.Form.Item>

      <antd.Form.Item>
        <antd.Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </antd.Button>
        <antd.Button onClick={() => navigate(`${AUTH_BASE_PATH}${REGISTER_PATH}`)} type="link">
          Register
        </antd.Button>
      </antd.Form.Item>
    </antd.Form>
  );
};
