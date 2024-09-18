import api, { mapPaginationParams, type PaginationParams } from "@/shared/api";
import type { AxiosResponse } from "axios";

interface GetProjectsParams extends Record<string, unknown>, PaginationParams {
  simple?: boolean;
  withIssuesEnabled?: boolean;
  lastActivityAfter?: Date;
}
interface ProjectDTO {
  id: number;
  name_with_namespace: string;
}
interface Project {
  id: number;
  nameWithNamespace: string;
}

const adaptProjectDTO = (dto: ProjectDTO): Project => ({
  id: dto.id,
  nameWithNamespace: dto.name_with_namespace,
});

const getProjects = async (
  params: GetProjectsParams
): Promise<AxiosResponse<Project[]>> => {
  const response = await api.get<ProjectDTO[]>("projects/", {
    params: {
      simple: params.simple,
      with_issues_enabled: params.withIssuesEnabled,
      last_activity_after: params.lastActivityAfter?.toISOString(),
      ...mapPaginationParams(params),
    },
  });

  return {
    ...response,
    data: response.data.map(adaptProjectDTO),
  };
};

export { getProjects };
export type { Project };
