import { ResponseError } from "@/utils";
import * as antd from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_BASE_PATH, LOGIN_PATH, postRegister } from "../..";
import { IRegister } from "../../types";
import "./RegisterForm.less";

export const RegisterForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const handleOnFinish = async (value: IRegister) => {
    const { username, password, firstName, lastName, email } = value;
    const register = await postRegister({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    const errorMessage = "There was an error trying to register the user.";

    if (register instanceof ResponseError) {
      console.error(errorMessage);
      antd.message.error(errorMessage);
      return;
    }

    const { status } = register;
    if (status === 201) {
      antd.message.success("User registered successfully.");
      navigate(`${AUTH_BASE_PATH}${LOGIN_PATH}`);
    } else {
      console.error(errorMessage);
      antd.message.error(errorMessage);
    }
  };

  return (
    <antd.Form
      name="login"
      className="auth-register-form"
      initialValues={{ remember: true }}
      onFinish={handleOnFinish}
      labelCol={{ span: 8 }}
    >
      <antd.Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <antd.Input autoComplete="new-username" />
      </antd.Form.Item>
      <antd.Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <antd.Input.Password autoComplete="new-password" />
      </antd.Form.Item>
      <antd.Form.Item
        label="Confirm Password"
        name="confirm_password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please input your Password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The two passwords that you entered do not match!"));
            },
          }),
        ]}
      >
        <antd.Input.Password autoComplete="new-password" />
      </antd.Form.Item>
      <antd.Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <antd.Input autoComplete="new-email" />
      </antd.Form.Item>
      <antd.Form.Item label="First Name" name="firstName">
        <antd.Input autoComplete="new-first-name" />
      </antd.Form.Item>
      <antd.Form.Item label="Last Name" name="lastName">
        <antd.Input autoComplete="new-last-name" />
      </antd.Form.Item>
      <antd.Form.Item>
        <antd.Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </antd.Button>
        <antd.Button onClick={() => navigate(`${AUTH_BASE_PATH}${LOGIN_PATH}`)} type="link">
          Already have an account?
        </antd.Button>
      </antd.Form.Item>
    </antd.Form>
  );
};
