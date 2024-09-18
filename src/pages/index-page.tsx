import { IssueState } from "@/entities/issue";
import { generateReport, type ProjectReport } from "@/features/report";
import { useEffect, useState, type FC } from "react";
import { useAuth } from "react-oidc-context";
import { ProjectsReportList } from "@/features/report";

const IndexPage: FC = () => {
  const auth = useAuth();

  const [report, setReport] = useState<ProjectReport[]>();

  const fetchReport = async () => {
    if (!auth.user) return;

    const report = await generateReport({
      issueState: IssueState.OPENED,
      startDate: new Date(2024, 9, 1, 0, 0, 0, 0),
      userId: parseInt(auth.user.profile.sub),
    });
    setReport(report);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (!report) return null;

  return <ProjectsReportList projects={report} />;
};

export default IndexPage;
