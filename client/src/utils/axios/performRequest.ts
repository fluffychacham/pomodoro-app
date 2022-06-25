import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosConfig } from "../../config/axios.config";
import { ResponseError } from "./ResponseError";

export const performRequest = async <T extends any>(
  config: AxiosRequestConfig
): Promise<ResponseError | AxiosResponse<T>> => {
  try {
    return await axios({
      ...axiosConfig,
      ...config,
    });
  } catch (error: ResponseError | any) {
    console.error(error);
    return new ResponseError(error.message);
  }
};
