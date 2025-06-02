
"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {

  Badge,
} from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Checkbox,} from "../../../../components/ui/checkbox";
import {  Input,
  } from "../../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle,
  } from "../../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter, } from "../../../../components/ui/drawer";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import { Send, Plus, Download, Eye, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import { toast } from "sonner";
import { Label } from "recharts";
import { Textarea } from "components/ui/textarea";

// Types
type ReportStatus = "DRAFT" | "SENT" | "SCHEDULED" | "FAILED";
type ReportType = "ANALYTICS" | "SEO" | "CAMPAIGN" | "SALES";

interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
  contact: { email: string; phone: string };
  metadata: { industry: string; address: string };
}

interface EmailReport {
  id: string;
  tenantId: string;
  type: ReportType;
  subject: string;
  content: string;
  recipientEmails: string[];
  scheduledAt?: string;
  sentAt?: string;
  status: ReportStatus;
  metadata: { ip?: string; analyticsData?: Record<string, any> };
}

// Mock Data
const data: { tenants: Tenant[]; emailReports: EmailReport[] } = {
  tenants: [
    {
      id: "t1",
      name: "GoCredo",
      dbUrl: "postgresql://user:pass@localhost:5432/gocredo",
      contact: { email: "admin@gocredo.in", phone: "+91 9876543210" },
      metadata: { industry: "Digital Marketing", address: "Mumbai, India" },
    },
    {
      id: "t2",
      name: "TechCorp",
      dbUrl: "postgresql://user:pass@localhost:5432/techcorp",
      contact: { email: "contact@techcorp.in", phone: "+91 9123456789" },
      metadata: { industry: "Technology", address: "Delhi, India" },
    },
  ],
  emailReports: [
    {
      id: "r1",
      tenantId: "t1",
      type: "ANALYTICS",
      subject: "Monthly Website Analytics",
      content: "Dear Client, here's your monthly analytics report...",
      recipientEmails: ["client@gocredo.in"],
      sentAt: "2024-06-01T10:00:00Z",
      status: "SENT",
      metadata: { ip: "192.168.1.1", analyticsData: { views: 10000, visitors: 8000 } },
    },
    {
      id: "r2",
      tenantId: "t2",
      type: "SEO",
      subject: "SEO Performance Report",
      content: "Dear Client, your SEO rankings have improved...",
      recipientEmails: ["seo@techcorp.in"],
      scheduledAt: "2024-06-10T09:00:00Z",
      status: "SCHEDULED",
      metadata: { ip: "192.168.1.2" },
    },
  ],
};

export default function EmailReports() {
  const [tenantId, setTenantId] = useState("");
  const [reportType, setReportType] = useState<ReportType>("ANALYTICS");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipientEmails, setRecipientEmails] = useState("");
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewReport, setPreviewReport] = useState<EmailReport | null>(null);
  const itemsPerPage = 5;

  // Filtering
  const filteredReports = useMemo(() => {
    return data.emailReports.filter(
      (report) =>
        (tenantId === "" || report.tenantId === tenantId) &&
        (statusFilter === "all" || report.status === statusFilter) &&
        (report.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.recipientEmails.some((email) =>
            email.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
  }, [tenantId, statusFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSendReport = useCallback(() => {
    if (!tenantId || !subject || !content || !recipientEmails) {
      toast.error("Please fill all required fields");
      return;
    }
    const emails = recipientEmails.split(",").map((email) => email.trim());
    if (emails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      toast.error("Invalid email format");
      return;
    }
    toast.success(scheduledAt ? "Report scheduled successfully" : "Report sent successfully");
    // Reset form
    setTenantId("");
    setReportType("ANALYTICS");
    setSubject("");
    setContent("");
    setRecipientEmails("");
    setScheduledAt(null);
  }, [tenantId, subject, content, recipientEmails, scheduledAt]);

  const handleExport = useCallback(() => {
    const csvData = filteredReports.map((report) => ({
      ID: report.id,
      Tenant: data.tenants.find((t) => t.id === report.tenantId)?.name,
      Type: report.type,
      Subject: report.subject,
      Recipients: report.recipientEmails.join(", "),
      Status: report.status,
      SentAt: report.sentAt || "N/A",
      ScheduledAt: report.scheduledAt || "N/A",
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "email_reports.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredReports]);

  const handlePreview = useCallback((report: EmailReport) => {
    setPreviewReport(report);
  }, []);

  const handleDelete = useCallback((reportId: string) => {
    toast.success(`Report ${reportId} deleted`);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        GoCredo Email Reports
      </motion.h1>

      {/* Create Report Form */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Create Email Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Tenant</Label>
              <Select value={tenantId} onValueChange={setTenantId}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select Tenant" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value=" all">All Tenants</SelectItem>
                  {data.tenants.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Report Type</Label>
              <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="ANALYTICS">Analytics</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="CAMPAIGN">Campaign</SelectItem>
                  <SelectItem value="SALES">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-300">Subject</Label>
              <Input
                placeholder="Report Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Content</Label>
              <Textarea
                placeholder="Email Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
              />
            </div>
            <div>
              <Label className="text-gray-300">Recipient Emails (comma-separated)</Label>
              <Input
                placeholder="e.g., client@gocredo.in, team@techcorp.in"
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Schedule (Optional)</Label>
              <DatePicker
                selected={scheduledAt}
                onChange={(date: Date | null) => setScheduledAt(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select Schedule Date & Time"
                className="w-full bg-gray-900 border-gray-700 text-white p-2 rounded-md"
              />
            </div>
            <Button
              onClick={handleSendReport}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Send className="mr-2 h-4 w-4" />
              {scheduledAt ? "Schedule Report" : "Send Report"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Sent & Scheduled Reports</CardTitle>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-gray-900 border-gray-700 text-white"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SENT">Sent</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-900 text-white"
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600">
                <TableHead className="text-gray-300">Tenant</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Subject</TableHead>
                <TableHead className="text-gray-300">Recipients</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Sent/Scheduled</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <TableCell className="text-white">
                    {data.tenants.find((t) => t.id === report.tenantId)?.name}
                  </TableCell>
                  <TableCell className="text-white">{report.type}</TableCell>
                  <TableCell className="text-white">{report.subject}</TableCell>
                  <TableCell className="text-white">{report.recipientEmails.join(", ")}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        report.status === "SENT"
                          ? "bg-green-500"
                          : report.status === "SCHEDULED"
                          ? "bg-yellow-500"
                          : report.status === "DRAFT"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }
                    >
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    {report.sentAt
                      ? new Date(report.sentAt).toLocaleString()
                      : report.scheduledAt
                      ? new Date(report.scheduledAt).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => handlePreview(report)}
                        className="text-gray-300 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(report.id)}
                        className="text-gray-300 hover:text-white"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-900 text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-900 text-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      {previewReport && (
        <Dialog open={!!previewReport} onOpenChange={() => setPreviewReport(null)}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{previewReport.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Tenant</Label>
                <p className="text-white">
                  {data.tenants.find((t) => t.id === previewReport.tenantId)?.name}
                </p>
              </div>
              <div>
                <Label className="text-gray-300">Type</Label>
                <p className="text-white">{previewReport.type}</p>
              </div>
              <div>
                <Label className="text-gray-300">Recipients</Label>
                <p className="text-white">{previewReport.recipientEmails.join(", ")}</p>
              </div>
              <div>
                <Label className="text-gray-300">Content</Label>
                <p className="text-white whitespace-pre-wrap">{previewReport.content}</p>
              </div>
              <div>
                <Label className="text-gray-300">Metadata</Label>
                <pre className="text-white bg-gray-800 p-2 rounded">
                  {JSON.stringify(previewReport.metadata, null, 2)}
                </pre>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-gray-700 bg-gray-900 text-white"
                onClick={() => setPreviewReport(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
