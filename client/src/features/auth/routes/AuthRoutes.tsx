import { lazyImport } from "@/utils";
import { Navigate, Route, Routes } from "react-router-dom";

const { Login } = lazyImport(() => import("."), "Login");
const { Register } = lazyImport(() => import("."), "Register");

export const AUTH_BASE_PATH = "/auth";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

export const AuthRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path={`${AUTH_BASE_PATH}${LOGIN_PATH}`} element={<Login />} />
      <Route path={`${AUTH_BASE_PATH}${REGISTER_PATH}`} element={<Register />} />
      <Route path="/*" element={<Navigate to={`${AUTH_BASE_PATH}${LOGIN_PATH}`} />} />
    </Routes>
  );
};
