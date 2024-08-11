import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = import.meta.env.VITE_SERVER_URL;

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url: string, config?: AxiosRequestConfig) => {
  const instance = axios.create({ baseURL: url, ...config });
  return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url: string, config?: AxiosRequestConfig) => {
  const token = '토큰 값';
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: 'Bearer ' + token },
    ...config,
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
