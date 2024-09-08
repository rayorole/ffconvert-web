import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatisticCardProps = {
  title: string;
  value: string | number;
  description: string;
};

export function StatisticCard({ title, value, description }: StatisticCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

type Conversion = {
  id: number;
  filename: string;
  convertedTo: string;
  date: string;
  status: string;
};

type ConversionTableProps = {
  conversions: Conversion[];
};

export function ConversionTable({ conversions }: ConversionTableProps) {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Recent Conversions</CardTitle>
    </CardHeader>
    <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Converted To</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conversions.map((conversion) => (
          <TableRow key={conversion.id}>
            <TableCell>{conversion.filename}</TableCell>
            <TableCell>{conversion.convertedTo}</TableCell>
            <TableCell>{conversion.date}</TableCell>
            <TableCell>{conversion.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
      </Card>
  );
}
