
    "use client";

    import { useState, useMemo, useCallback } from "react";
    import { motion } from "framer-motion";
    import {
      Card,
      CardHeader,
      CardTitle,
      CardContent,
    } from "../../../../components/ui/card";
    import { Button } from "../../../../components/ui/button";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "../../../../components/ui/select";
    import { Input } from "../../../../components/ui/input";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "../../../../components/ui/table";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
    import { Download, FileText, Archive, Trash } from "lucide-react";
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";
    import Papa from "papaparse";
    import html2pdf from "html2pdf.js";
    import { Pie, Line } from "react-chartjs-2";
    import "chart.js/auto"; 
import { Badge } from "components/ui/badge";
    // Types
    type ActionType =
      | "LOGIN"
      | "LOGOUT"
      | "CONTENT_UPDATE"
      | "PAYMENT_UPDATE"
      | "USER_MODIFIED"
      | "CAMPAIGN_MODIFIED";
    type Status = "SUCCESS" | "FAILED" | "PENDING";
    interface Tenant {
      id: string;
      name: string;
      dbUrl: string;
      contact: { email: string; phone: string };
      metadata: { industry: string; address: string };
    };

    interface AuditLog {
      id: string;
      tenantId: string;
      action: ActionType;
      userId: string;
      timestamp: string;
      entity: string; // e.g., "page", "campaign"
      status: Status;
      metadata: { ip?: string; changes?: Record<string, any> };
      comments: { user: string; text: string; date: string }[];
    };

    // Mock Data
    const data: { tenants: Tenant[]; auditLogs: AuditLog[] } = {
      tenants: [
        {
          id: "t1",
          name: "GoCoCredo",
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
      auditLogs: [
        {
          id: "log1",
          tenantId: "t1",
          action: "LOGIN",
          userId: "u1",
          timestamp: "2024-06-01T10:00:00Z",
          entity: "user",
          status: "SUCCESS",
          metadata: { ip: "192.168.1.1" },
          comments: [{ user: "Admin", text: "User logged in", date: "2024-06-01" }],
        },
        {
          id: "log2",
          tenantId: "t2",
          action: "CONTENT_UPDATE",
          userId: "u2",
          timestamp: "2024-06-02T12:00:00Z",
          entity: "page",
          status: "SUCCESS",
          metadata: { ip: "192.168.1.2", changes: { title: "New Campaign" } },
          comments: [],
        },
        ...Array.from({ length: 18 }, (_, i) => ({
          id: `${i + 3}`,
          tenantId: `t${(i % 2) + 1}`,
          action: ["LOGIN", "CONTENT_UPDATE", "PAYMENT_UPDATE", "USER_MODIFIED", "CAMPAIGN_MODIFIED"][
            i % 5
          ] as ActionType,
          userId: `u${(i % 4) + 1}`,
          timestamp: `2024-05-${30 - (i % 10)}T${10 + i % 12}:00:00Z`,
          entity: ["user", "campaign", "page", "invoice", "payment"][i % 5],
          status: ["SUCCESS", "FAILED", "PENDING"][i % 3] as Status,
          metadata: { ip: `192.168.1.${i + 3}` },
          comments: [],
        })),
      ],
    };

    export default function AuditLogs() {
      const [tenantFilter, setTenantFilter] = useState("all");
      const [actionFilter, setActionFilter] = useState("all");
      const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
      const [searchTerm, setSearchTerm] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;

      // Filtering
      const filteredLogs = useMemo(() => {
        const [startDate, endDate] = dateRange;
        return data.auditLogs.filter(
          (log) =>
            (tenantFilter === "all" || log.tenantId === tenantFilter) &&
            (actionFilter === "all" || log.action === actionFilter) &&
            (log.id.includes(searchTerm) ||
              log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
              data.tenants
                .find((t) => t.id === log.tenantId)
                ?.name.toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (!startDate || new Date(log.timestamp) >= startDate) &&
            (!endDate || new Date(log.timestamp) <= endDate)
        );
      }, [tenantFilter, actionFilter, searchTerm, dateRange]);

      // Pagination
      const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
      const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

      // Chart Data
      const actionTrendChart = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Audit Actions",
            data: [50, 75, 100, 125, 150, 200],
            borderColor: "rgba(168, 85, 247, 1)",
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      };

      const actionDistributionChart = {
        labels: [
          "Login",
          "Content Update",
          "Payment Update",
          "User Modified",
          "Campaign Modified",
        ],
        datasets: [
          {
            data: [
              filteredLogs.filter((l) => l.action === "LOGIN").length,
              filteredLogs.filter((l) => l.action === "CONTENT_UPDATE").length,
              filteredLogs.filter((l) => l.action === "PAYMENT_UPDATE").length,
              filteredLogs.filter((l) => l.action === "USER_MODIFIED").length,
              filteredLogs.filter((l) => l.action === "CAMPAIGN_MODIFIED").length,
            ],
            backgroundColor: ["#A855F7", "#EC4899", "#60A5FA", "#34D399", "#FBBF24"],
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        plugins: { legend: { labels: { color: "white" } } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } },
          x: { grid: { display: false }, ticks: { color: "white" } },
        },
      };

      // Export CSV
      const handleExport = useCallback(() => {
        const csvData = filteredLogs.map((log) => ({
          ID: log.id,
          Tenant: data.tenants.find((t) => t.id === log.tenantId)?.name,
          Action: log.action,
          User: log.userId,
          Timestamp: new Date(log.timestamp).toLocaleString(),
          Entity: log.entity,
          Status: log.status,
          IP: log.metadata.ip || "N/A",
        }));
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "audit_logs.csv";
        link.click();
        document.body.removeChild(link);
      }, [filteredLogs]);

      // Generate PDF Report
      const generateAuditReportPDF = useCallback((log: AuditLog) => {
        const tenant = data.tenants.find((t) => t.id === log.tenantId);
        const element = document.createElement("div");
        element.innerHTML = `
          <div style="font-family: Arial; padding: 20px; background: #fff; color: #000;">
            <h2 style="color: #A855F7;">GoCredo Audit Log #${log.id}</h2>
            <p><strong>Tenant:</strong> ${tenant?.name}</p>
            <p><strong>Action:</strong> ${log.action.replace("_", " ")}</p>
            <p><strong>User:</strong> ${log.userId}</p>
            <p><strong>Timestamp:</strong> ${new Date(log.timestamp).toLocaleString()}</p>
            <p><strong>Entity:</strong> ${log.entity}</p>
            <p><strong>Status:</strong> ${log.status}</p>
            <p><strong>IP Address:</strong> ${log.metadata.ip || "N/A"}</p>
            ${
              log.metadata.changes
                ? `<p><strong>Changes:</strong> ${JSON.stringify(log.metadata.changes)}</p>`
                : ""
            }
            <p><strong>Comments:</strong> ${
              log.comments.length > 0
                ? log.comments.map((c) => `${c.user}: ${c.text} (${c.date})`).join("<br>")
                : "None"
            }</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `;
        html2pdf().from(element).save(`audit_log_${log.id}.pdf`);
      }, []);

      return (
        <div className="space-y-6 p-6 bg-gray-900">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold text-white md:text-3xl"
          >
            GoCredo Audit Logs
          </motion.h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Select value={tenantFilter} onValueChange={setTenantFilter}>
                <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select Tenant" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Tenants</SelectItem>
                  {data.tenants.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select Action" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                  <SelectItem value="all">All Actions</SelectItem>
                  {[
                    "LOGIN",
                    "CONTENT_UPDATE",
                    "PAYMENT_UPDATE",
                    "USER_MODIFIED",
                    "CAMPAIGN_MODIFIED",
                  ].map((action) => (
                    <SelectItem key={action} value={action}>
                      {action.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DatePicker
                selectsRange
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                onChange={setDateRange}
                placeholderText="Select Date Range"
                className="w-[200px] bg-gray-900 border-gray-700 text-white p-2 rounded-md"
              />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px] bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Tabs for Log Categories */}
          <Tabs defaultValue="system" className="w-full">
            <TabsList className="bg-gray-950 border-gray-800">
              <TabsTrigger
                value="system"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                System
              </TabsTrigger>
              <TabsTrigger
                value="user"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                User
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                Content
              </TabsTrigger>
            </TabsList>

            {/* System Logs */}
            <TabsContent value="system">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">System Audit Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-300">Log ID</TableHead>
                        <TableHead className="text-gray-300">Tenant</TableHead>
                        <TableHead className="text-gray-300">Action</TableHead>
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Timestamp</TableHead>
                        <TableHead className="text-gray-300">Entity</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs
                        .filter((log) => ["LOGIN"].includes(log.action))
                        .map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-gray-800 hover:bg-gray-800"
                          >
                            <TableCell className="text-white">{log.id}</TableCell>
                            <TableCell className="text-white">
                              {data.tenants.find((t) => t.id === log.tenantId)?.name}
                            </TableCell>
                            <TableCell className="text-white">{log.action.replace("_", " ")}</TableCell>
                            <TableCell className="text-white">{log.userId}</TableCell>
                            <TableCell className="text-white">
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-white">{log.entity}</TableCell>
                            <TableCell className="text-white">
                              <Badge
                                className={
                                  log.status === "SUCCESS"
                                    ? "bg-green-500"
                                    : log.status === "PENDING"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }
                              >
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => generateAuditReportPDF(log)}
                                className="text-gray-300 hover:text-white"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Logs */}
            <TabsContent value="user">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">User Audit Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-300">Log ID</TableHead>
                        <TableHead className="text-gray-300">Tenant</TableHead>
                        <TableHead className="text-gray-300">Action</TableHead>
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Timestamp</TableHead>
                        <TableHead className="text-gray-300">Entity</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs
                        .filter((log) => ["USER_MODIFIED"].includes(log.action))
                        .map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-gray-800 hover:bg-gray-800"
                          >
                            <TableCell className="text-white">{log.id}</TableCell>
                            <TableCell className="text-white">
                              {data.tenants.find((t) => t.id === log.tenantId)?.name}
                            </TableCell>
                            <TableCell className="text-white">{log.action.replace("_", " ")}</TableCell>
                            <TableCell className="text-white">{log.userId}</TableCell>
                            <TableCell className="text-white">
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-white">{log.entity}</TableCell>
                            <TableCell className="text-white">
                              <Badge
                                className={
                                  log.status === "SUCCESS"
                                    ? "bg-green-500"
                                    : log.status === "PENDING"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }
                              >
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => generateAuditReportPDF(log)}
                                className="text-gray-300 hover:text-white"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Logs */}
            <TabsContent value="payments">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Payment Audit Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-300">Log ID</TableHead>
                        <TableHead className="text-gray-300">Tenant</TableHead>
                        <TableHead className="text-gray-300">Action</TableHead>
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Timestamp</TableHead>
                        <TableHead className="text-gray-300">Entity</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs
                        .filter((log) => ["PAYMENT_UPDATE"].includes(log.action))
                        .map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-gray-800 hover:bg-gray-800"
                          >
                            <TableCell className="text-white">{log.id}</TableCell>
                            <TableCell className="text-white">
                              {data.tenants.find((t) => t.id === log.tenantId)?.name}
                            </TableCell>
                            <TableCell className="text-white">{log.action.replace("_", " ")}</TableCell>
                            <TableCell className="text-white">{log.userId}</TableCell>
                            <TableCell className="text-white">
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-white">{log.entity}</TableCell>
                            <TableCell className="text-white">
                              <Badge
                                className={
                                  log.status === "SUCCESS"
                                    ? "bg-green-500"
                                    : log.status === "PENDING"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }
                              >
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => generateAuditReportPDF(log)}
                                className="text-gray-300 hover:text-white"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Logs */}
            <TabsContent value="content">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Content Audit Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-300">Log ID</TableHead>
                        <TableHead className="text-gray-300">Tenant</TableHead>
                        <TableHead className="text-gray-300">Action</TableHead>
                        <TableHead className="text-gray-300">User</TableHead>
                        <TableHead className="text-gray-300">Timestamp</TableHead>
                        <TableHead className="text-gray-300">Entity</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs
                        .filter((log) => ["CONTENT_UPDATE", "CAMPAIGN_MODIFIED"].includes(log.action))
                        .map((log, index) => (
                          <motion.tr
                            key={log.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-gray-800 hover:bg-gray-800"
                          >
                            <TableCell className="text-white">{log.id}</TableCell>
                            <TableCell className="text-white">
                              {data.tenants.find((t) => t.id === log.tenantId)?.name}
                            </TableCell>
                            <TableCell className="text-white">{log.action.replace("_", " ")}</TableCell>
                            <TableCell className="text-white">{log.userId}</TableCell>
                            <TableCell className="text-white">
                              {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-white">{log.entity}</TableCell>
                            <TableCell className="text-white">
                              <Badge
                                className={
                                  log.status === "SUCCESS"
                                    ? "bg-green-500"
                                    : log.status === "PENDING"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }
                              >
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                onClick={() => generateAuditReportPDF(log)}
                                className="text-gray-300 hover:text-white"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Charts */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Action Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={actionTrendChart} options={chartOptions} />
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Action Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie
                data={actionDistributionChart}
                options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
              />
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-900 text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-900 text-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }