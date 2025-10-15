import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

// Define structure of saved form entries in localStorage
export interface SavedForm {
  id: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  [key: string]: unknown; // allow other arbitrary form fields
}

interface BasicTableOneProps {
  formId: string;
}

export default function BasicTableOne({ formId }: BasicTableOneProps) {
  const navigate = useNavigate(); // Add navigation hook
  
  // Load the list of saved forms for this formId
  const savedForms: SavedForm[] = useMemo(() => {
    const listKey = `list:${formId}`;
    const raw = localStorage.getItem(listKey);
    try {
      return raw ? (JSON.parse(raw) as SavedForm[]) : [];
    } catch (e) {
      console.error(`Failed to parse localStorage for ${listKey}`, e);
      return [];
    }
  }, [formId]);

  // Handle row click navigation
  const handleRowClick = (docId: string) => {
        const targetUrl = `${window.location.origin}${formId}?docId=${docId}`;
    window.location.href = targetUrl;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Document ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Updated At
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {savedForms.length > 0 ? (
              savedForms.map((doc) => (
                <tr 
                  key={doc.id}
                  onClick={() => handleRowClick(doc.id)}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors border-b border-gray-100 dark:border-white/[0.05]"
                >
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {doc.id}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(doc.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(doc.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        doc.status === "Active"
                          ? "success"
                          : doc.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {doc.status ?? "N/A"}
                    </Badge>
                  </TableCell>
                </tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  // colSpan={4}
                  className="px-5 py-4 text-center text-gray-500"
                >
                  No saved forms found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}