import type { InternalAxiosRequestConfig } from "axios";
import { getUser } from "../lib";

const authInterceptor = async (request: InternalAxiosRequestConfig) => {
  const user = await getUser();
  if (user) {
    request.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return request;
};

export { authInterceptor };
