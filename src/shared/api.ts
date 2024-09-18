import axios, { type AxiosResponse } from "axios";
import config from "./config";
import { authInterceptor } from "./auth";

interface PaginationParams {
  page?: number;
  perPage?: number;
}
const mapPaginationParams = (params: PaginationParams) => ({
  page: params.page,
  per_page: params.perPage,
});
const fetchAllPaginatedData = async <P extends PaginationParams, D = unknown>(
  fetcher: (params: P) => Promise<AxiosResponse<D[]>>,
  params: P,
  page = 1,
  perPage = 100
): Promise<AxiosResponse<D[]>> => {
  const response = await fetcher({
    ...params,
    page,
    perPage,
  });

  const nextPage = response.headers["x-next-page"];
  if (nextPage) {
    const nextResponse = await fetchAllPaginatedData<P, D>(
      fetcher,
      params,
      nextPage,
      perPage
    );
    return {
      ...nextResponse,
      data: [...response.data, ...nextResponse.data],
    };
  }

  return response;
};

const api = axios.create({
  baseURL: new URL("/api/v4/", config.VITE_API_URL).href,
});

api.interceptors.request.use(authInterceptor);

export default api;
export { mapPaginationParams, fetchAllPaginatedData };
export type { PaginationParams };
