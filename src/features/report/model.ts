import { getIssues, IssueScope, IssueState } from "@/entities/issue";
import { getProjects } from "@/entities/project";
import { fetchAllPaginatedData } from "@/shared/api";

type ReportParameters = {
  userId: number;
  issueState: IssueState;
  startDate: Date;
};
interface IssueReport {
  id: number;
  title: string;
  labels: string[];
  estimate: number;
  spent: number;
  updatedAt: Date | null;
  closedAt: Date | null;
  link: string;
}
interface ProjectReport {
  id: number;
  name: string;
  percentage: number;
  issues: IssueReport[];
}

const processProjects = async ({ issueState, startDate }: ReportParameters) => {
  const { data } = await fetchAllPaginatedData(getProjects, {
    simple: true,
    withIssuesEnabled: true,
    lastActivityAfter: issueState === IssueState.CLOSED ? startDate : undefined,
  });
  return data;
};

const processIssues = async ({
  issueState,
  userId,
  startDate,
}: ReportParameters) => {
  const { data } = await fetchAllPaginatedData(getIssues, {
    scope: IssueScope.ALL,
    state: issueState,
    assigneeId: userId,
    updatedAfter: issueState === IssueState.CLOSED ? startDate : undefined,
  });
  data.filter((issue) => {
    if (issue.movedToId) return false;

    if (issueState === IssueState.CLOSED) {
      if (!issue.closedAt) return false;
      return (
        issue.closedAt.getMonth() + 1 === startDate.getMonth() &&
        issue.closedAt.getFullYear() === startDate.getFullYear()
      );
    }

    return true;
  });
  data.sort((a, b) => {
    if (issueState === IssueState.CLOSED) {
      return a.closedAt - b.closedAt;
    }
    return a.updatedAt - b.updatedAt;
  });
  return data;
};

const generateReport = async (
  options: ReportParameters
): Promise<ProjectReport[]> => {
  const projects = await processProjects(options);
  const issues = await processIssues(options);

  const timeStats = issues.reduce(
    (acc, issue) => {
      acc.totalEstimate += issue.timeStats.timeEstimate;
      acc.totalSpent += issue.timeStats.totalTimeSpent;
      return acc;
    },
    { totalEstimate: 0, totalSpent: 0 }
  );
  timeStats.totalEstimate =
    Math.round((timeStats.totalEstimate / 3600) * 10) / 10;
  timeStats.totalSpent = Math.round((timeStats.totalSpent / 3600) * 10) / 10;

  return [...new Set(issues.map((issue) => issue.projectId))].map(
    (projectId) => {
      const project = projects.find((project) => project.id === projectId);
      if (!project) throw new Error("Project not found");
      const projectIssues = issues.filter(
        (issue) => issue.projectId === projectId
      );
      const percentage =
        Math.round(
          ((projectIssues.reduce(
            (acc, issue) => acc + issue.timeStats.timeEstimate,
            0
          ) *
            100) /
            timeStats.totalEstimate) *
            10
        ) / 10;

      return {
        id: project.id,
        name: project.nameWithNamespace,
        percentage: Number.isNaN(percentage) ? 0 : percentage,
        issues: projectIssues.map((issue) => ({
          id: issue.id,
          title: issue.title,
          labels: issue.labels,
          estimate: Math.round((issue.timeStats.timeEstimate / 3600) * 10) / 10,
          spent: Math.round((issue.timeStats.totalTimeSpent / 3600) * 10) / 10,
          updatedAt: issue.updatedAt,
          closedAt: issue.closedAt,
          link: issue.webUrl,
        })),
      };
    }
  );
};

export { generateReport };
export type { ProjectReport, IssueReport };
