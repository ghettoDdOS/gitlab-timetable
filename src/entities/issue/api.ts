import api, { mapPaginationParams, type PaginationParams } from "@/shared/api";
import type { AxiosResponse } from "axios";

enum IssueScope {
  ALL = "all",
}
enum IssueState {
  OPENED = "opened",
  CLOSED = "closed",
}
interface GetIssuesParams extends PaginationParams {
  scope?: IssueScope;
  state?: IssueState;
  assigneeId?: number;
  updatedAfter?: Date;
}
interface IssueDTO {
  id: number;
  moved_to_id: number | null;
  closed_at: string | null;
  updated_at: string | null;
  project_id: number;
  web_url: string;
  labels: string[];
  title: string;
  time_stats: {
    time_estimate: number;
    total_time_spent: number;
  };
}
interface Issue {
  id: number;
  movedToId: number | null;
  closedAt: Date | null;
  updatedAt: Date | null;
  projectId: number;
  labels: string[];
  webUrl: string;
  title: string;
  timeStats: {
    timeEstimate: number;
    totalTimeSpent: number;
  };
}

const adaptIssueDTO = (dto: IssueDTO): Issue => ({
  id: dto.id,
  movedToId: dto.moved_to_id,
  closedAt: dto.closed_at ? new Date(dto.closed_at) : null,
  updatedAt: dto.updated_at ? new Date(dto.updated_at) : null,
  projectId: dto.project_id,
  title: dto.title,
  labels: dto.labels,
  webUrl: dto.web_url,
  timeStats: {
    timeEstimate: dto.time_stats.time_estimate,
    totalTimeSpent: dto.time_stats.total_time_spent,
  },
});

const getIssues = async (
  params: GetIssuesParams
): Promise<AxiosResponse<Issue[]>> => {
  const response = await api.get<IssueDTO[]>("issues/", {
    params: {
      scope: params.scope,
      state: params.state,
      assignee_id: params.assigneeId,
      updated_after: params.updatedAfter?.toISOString(),
      ...mapPaginationParams(params),
    },
  });

  return {
    ...response,
    data: response.data.map(adaptIssueDTO),
  };
};

export { getIssues, IssueScope, IssueState };
export type { Issue };
