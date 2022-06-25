import React from "react";
import { AuthLayout } from "../components/AuthLayout";
import { RegisterForm } from "../components/RegisterForm";

export const Register: React.FunctionComponent = () => {
  return (
    <AuthLayout title="Register">
      <RegisterForm />
    </AuthLayout>
  );
};
