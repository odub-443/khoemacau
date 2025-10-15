import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface InspectionFinding {
  id: number;
  finding: string;
  location: string;
  inspector: string;
  date: string;
  status: "Closed" | "Open" | "In Progress";
}

// Define the table data using the interface
const tableData: InspectionFinding[] = [
  {
    id: 1,
    finding: "Ground Support Issue",
    location: "Stope 27",
    inspector: "Justin Mason",
    date: "2024-05-10",
    status: "Open",
  },
  {
    id: 2,
    finding: "Ventilation Problem",
    location: "Corridor C-01",
    inspector: "Jane Doe",
    date: "2024-05-09",
    status: "In Progress",
  },
  {
    id: 3,
    finding: "Improper Signage",
    location: "Corridor C-02",
    inspector: "John Smith",
    date: "2024-05-08",
    status: "Closed",
  },
  {
    id: 4,
    finding: "Fire Hose Not Accessible",
    location: "Corridor C-03",
    inspector: "Justin Mason",
    date: "2024-05-07",
    status: "Open",
  },
  {
    id: 5,
    finding: "Poor Housekeeping",
    location: "Stope 27",
    inspector: "Jane Doe",
    date: "2024-05-06",
    status: "Closed",
  },
];

export default function RecentInspections() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="mb-5 flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Findings
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="py-3 font-semibold text-gray-500 text-theme-xs uppercase dark:text-gray-400">
                Finding
              </TableCell>
              <TableCell className="py-3 font-semibold text-gray-500 text-theme-xs uppercase dark:text-gray-400">
                Location
              </TableCell>
              <TableCell className="py-3 font-semibold text-gray-500 text-theme-xs uppercase dark:text-gray-400">
                Inspector
              </TableCell>
              <TableCell className="py-3 font-semibold text-gray-500 text-theme-xs uppercase dark:text-gray-400">
                Date
              </TableCell>
              <TableCell className="py-3 font-semibold text-gray-500 text-theme-xs uppercase dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((finding) => (
              <TableRow key={finding.id}>
                <TableCell className="flex items-center gap-3 py-3 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {finding.finding}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {finding.location}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {finding.inspector}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {finding.date}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      finding.status === "Closed"
                        ? "success"
                        : finding.status === "Open"
                        ? "error"
                        : "warning"
                    }
                  >
                    {finding.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}