import type { FC } from "react";
import type { IssueReport } from "../model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

type IssuesReportTableProps = {
  issues: IssueReport[];
};

const IssuesReportTable: FC<IssuesReportTableProps> = ({ issues }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Estimate</TableHead>
          <TableHead>Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.title}</TableCell>
            <TableCell>{issue.estimate}</TableCell>
            <TableCell>{issue.spent}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { IssuesReportTable };
