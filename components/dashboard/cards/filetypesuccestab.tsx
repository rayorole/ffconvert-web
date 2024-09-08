import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FileTypeSuccessStat = {
  fileType: string;
  successRate: number;
};

type FileTypeSuccessTableProps = {
  stats: FileTypeSuccessStat[];
};

export function FileTypeSuccessTable({ stats }: FileTypeSuccessTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Rate per File Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Type</TableHead>
              <TableHead>Success Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.fileType}>
                <TableCell>{stat.fileType}</TableCell>
                <TableCell>{stat.successRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
