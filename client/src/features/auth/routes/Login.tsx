import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export const Login: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
};
