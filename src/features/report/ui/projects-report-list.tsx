import type { FC } from "react";
import type { ProjectReport } from "../model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui";
import { IssuesReportTable } from "./issues-report-table";

type RProjectsReportListProps = {
  projects: ProjectReport[];
};

const ProjectsReportList: FC<RProjectsReportListProps> = ({ projects }) => {
  return (
    <Accordion type="multiple">
      {projects.map((project) => (
        <AccordionItem key={project.id} value={project.id.toString()}>
          <AccordionTrigger>{project.name}</AccordionTrigger>
          <AccordionContent>
            <IssuesReportTable issues={project.issues} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export { ProjectsReportList };
