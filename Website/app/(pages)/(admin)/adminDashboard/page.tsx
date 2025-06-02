"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import Papa from "papaparse";
import {
  DashboardMetrics,
} from "../../../../components/admin/dashboard/dashboard-matrix";
import {

  RecentActivityFeed,

} from "../../../../components/admin/dashboard/recentActivityFeed";
import {
  DashboardCharts,
} from "../../../../components/admin/dashboard/dashboard-chart";
import {
  DashboardFilters,
} from "../../../../components/admin/dashboard/dashboard-filter";
import {
  DetailsDrawer,
} from "../../../../components/admin/dashboard/details-drawer";
import { DollarSign, FileText, Globe, Mail, Users } from "lucide-react";

// Types
interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
}

interface Website {
  id: string;
  tenantId: string;
  url: string;
  mediaCount: number;
  blogCount: number;
  status: "ACTIVE" | "MAINTENANCE" | "INACTIVE";
  createdAt: string; // Added createdAt property
}

interface AuditLog {
  id: string;
  tenantId: string;
  action: string;
  userId: string;
  timestamp: string;
  metadata: { ip?: string };
}

interface EmailReport {
  id: string;
  tenantId: string;
  type: "ANALYTICS" | "SEO" | "CAMPAIGN" | "SALES";
  subject: string;
  recipientEmails: string[];
  status: "DRAFT" | "SENT" | "SCHEDULED" | "FAILED";
  sentAt?: string;
}

// Mock Data
const data = {
  tenants: [
    { id: "t1", name: "GoCredo", dbUrl: "postgresql://user:pass@localhost:5432/gocredo" },
    { id: "t2", name: "TechCorp", dbUrl: "postgresql://user:pass@localhost:5432/techcorp" },
  ],
  websites: [
    { id: "w1", tenantId: "t1", url: "gocredo.in", mediaCount: 15, blogCount: 8, status: "ACTIVE", createdAt: "2024-06-01T10:00:00Z" },
    { id: "w2", tenantId: "t2", url: "techcorp.in", mediaCount: 10, blogCount: 5, status: "MAINTENANCE", createdAt: "2024-06-02T12:00:00Z" },
    { id: "w3", tenantId: "t2", url: "styleboutique.co.in", mediaCount: 8, blogCount: 12, status: "ACTIVE", createdAt: "2024-06-03T14:00:00Z" },
  ],
  auditLogs: [
    { id: "a1", tenantId: "t1", action: "LOGIN", userId: "u1", timestamp: "2024-06-01T10:00:00Z", metadata: { ip: "192.168.1.1" } },
    { id: "a2", tenantId: "t2", action: "WEBSITE_UPDATED", userId: "u2", timestamp: "2024-06-02T12:00:00Z", metadata: { ip: "192.168.1.2" } },
  ],
  emailReports: [
    { id: "e1", tenantId: "t1", type: "ANALYTICS", subject: "Monthly Analytics", recipientEmails: ["client@gocredo.in"], status: "SENT", sentAt: "2024-06-01T10:00:00Z" },
    { id: "e2", tenantId: "t2", type: "SEO", subject: "SEO Report", recipientEmails: ["seo@techcorp.in"], status: "SCHEDULED" },
  ],
  users: 12345,
  revenue: 45231,
};

export default function AdminDashboard() {
  const [tenantFilter, setTenantFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState<{ type: "WEBSITE" | "AUDIT" | "EMAIL"; data: any; tenants: { id: string; name: string }[] } | null>(null);

  // Filtering
  const filteredData = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return {
      websites: data.websites.filter(
        (w) =>
          (tenantFilter === "all" || w.tenantId === tenantFilter) &&
          w.url.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!startDate || new Date(w.createdAt || "2024-06-01") >= startDate) &&
          (!endDate || new Date(w.createdAt || "2024-06-01") <= endDate)
      ),
      auditLogs: data.auditLogs.filter(
        (a) =>
          (tenantFilter === "all" || a.tenantId === tenantFilter) &&
          a.action.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!startDate || new Date(a.timestamp) >= startDate) &&
          (!endDate || new Date(a.timestamp) <= endDate)
      ),
      emailReports: data.emailReports.filter(
        (e) =>
          (tenantFilter === "all" || e.tenantId === tenantFilter) &&
          e.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!startDate || new Date(e.sentAt || "2024-06-01") >= startDate) &&
          (!endDate || new Date(e.sentAt || "2024-06-01") <= endDate)
      ),
    };
  }, [tenantFilter, dateRange, searchTerm]);

  // Metrics
  const metrics = [
    { title: "Total Users", value: data.users.toLocaleString(), change: "+12%", trend: "up" as "up", icon: Users },
    { title: "Revenue", value: `₹${data.revenue.toLocaleString()}`, change: "+8%", trend: "up" as "up", icon: DollarSign },
    { title: "Websites", value: filteredData.websites.length.toString(), change: "+5%", trend: "up" as "up", icon: Globe },
    { title: "Email Reports", value: filteredData.emailReports.length.toString(), change: "+10%", trend: "up" as "up", icon: Mail },
    { title: "Audit Logs", value: filteredData.auditLogs.length.toString(), change: "+15%", trend: "up" as "up", icon: FileText },
  ];

  // Recent Activities
  const activities = [
    ...filteredData.auditLogs.map((log) => ({
      id: log.id,
      type: "AUDIT" as const,
      description: `${log.action} by ${log.userId}`,
      timestamp: log.timestamp,
      tenantId: log.tenantId,
    })),
    ...filteredData.websites.map((website) => ({
      id: website.id,
      type: "WEBSITE" as const,
      description: `Website ${website.url} updated`,
      timestamp: "2024-06-01T10:00:00Z",
      tenantId: website.tenantId,
    })),
    ...filteredData.emailReports.map((report) => ({
      id: report.id,
      type: "EMAIL" as const,
      description: `Email Report: ${report.subject}`,
      timestamp: report.sentAt || "2024-06-01T10:00:00Z",
      tenantId: report.tenantId,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

  // Chart Data
  const websiteStatusData = {
    labels: ["Active", "Maintenance", "Inactive"],
    data: [
      filteredData.websites.filter((w) => w.status === "ACTIVE").length,
      filteredData.websites.filter((w) => w.status === "MAINTENANCE").length,
      filteredData.websites.filter((w) => w.status === "INACTIVE").length,
    ],
  };

  const auditTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [50, 75, 100, 125, 150, 200],
  };

  const emailReportTypeData = {
    labels: ["Analytics", "SEO", "Campaign", "Sales"],
    data: [
      filteredData.emailReports.filter((e) => e.type === "ANALYTICS").length,
      filteredData.emailReports.filter((e) => e.type === "SEO").length,
      filteredData.emailReports.filter((e) => e.type === "CAMPAIGN").length,
      filteredData.emailReports.filter((e) => e.type === "SALES").length,
    ],
  };

  // Export
  const handleExport = useCallback(() => {
    const csvData = [
      ...filteredData.websites.map((w) => ({
        Type: "Website",
        Tenant: data.tenants.find((t) => t.id === w.tenantId)?.name,
        URL: w.url,
        Status: w.status,
        MediaCount: w.mediaCount,
        BlogCount: w.blogCount,
      })),
      ...filteredData.auditLogs.map((a) => ({
        Type: "Audit Log",
        Tenant: data.tenants.find((t) => t.id === a.tenantId)?.name,
        Action: a.action,
        User: a.userId,
        Timestamp: a.timestamp,
      })),
      ...filteredData.emailReports.map((e) => ({
        Type: "Email Report",
        Tenant: data.tenants.find((t) => t.id === e.tenantId)?.name,
        Subject: e.subject,
        Status: e.status,
        SentAt: e.sentAt || "N/A",
      })),
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dashboard_data.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredData]);

  return (
    <div className="space-y-6 p-6 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        GoCredo Admin Dashboard
      </motion.h1>

      <DashboardFilters
        tenantFilter={tenantFilter}
        setTenantFilter={setTenantFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tenants={data.tenants}
      />

      <Button
        variant="outline"
        className="border-gray-700 bg-gray-900 text-white"
        onClick={handleExport}
      >
        Export Dashboard
      </Button>

      <DashboardMetrics metrics={metrics} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <RecentActivityFeed activities={activities} tenants={data.tenants} />
      </div>

      <DashboardCharts
        websiteStatusData={websiteStatusData}
        auditTrendData={auditTrendData}
        emailReportTypeData={emailReportTypeData}
      />

      <DetailsDrawer details={details} setDetails={setDetails} tenants={data.tenants} />
    </div>
  );
}