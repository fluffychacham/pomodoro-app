import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000, // 5 seconds
  withCredentials: true,
  xsrfCookieName: "POMODORO_SESSION",
}