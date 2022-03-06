import axios, { AxiosResponse } from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem("accessToken");

  if (token && config) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

class BaseService {
  responseBody<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  requests = {
    get: <T>(url: string, params = {}) =>
      API.get<T>(url, { params }).then(this.responseBody),
    post: <T>(url: string, body: {}) => API.post<T>(url, body),
    put: <T>(url: string, body: {}) =>
      API.put<T>(url, body).then(this.responseBody),
    del: <T>(url: string) => API.delete<T>(url),
  };
}

export default BaseService;
