"use client";

import { useState, useMemo, useCallback } from "react";
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
import { Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter, } from "../../../../components/ui/drawer";
import {  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,} from "../../../../components/ui/dropdown-menu";
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
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Plus, Download, Edit, Trash, FileText, MoreHorizontal } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import html2pdf from "html2pdf.js";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

// Types
type Status = "ACTIVE" | "MAINTENANCE" | "INACTIVE";
type SortKey = "url" | "mediaCount" | "blogCount" | "addedAt";

interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
  contact: { email: string; phone: string };
  metadata: { industry: string; address: string };
}

interface Website {
  id: string;
  tenantId: string;
  url: string;
  mediaCount: number;
  blogCount: number;
  seoMetrics: { pageSpeed: number; keywordRank: number };
  status: Status;
  addedAt: string;
}

interface AuditLog {
  id: string;
  tenantId: string;
  action: "WEBSITE_ADDED" | "WEBSITE_UPDATED" | "WEBSITE_DELETED";
  userId: string;
  timestamp: string;
  entity: string;
  metadata: { ip?: string; changes?: Record<string, any> };
}

// Mock Data
const data: { tenants: Tenant[]; websites: Website[]; auditLogs: AuditLog[] } = {
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
  websites: [
    {
      id: "1",
      tenantId: "t1",
      url: "gocredo.in",
      mediaCount: 15,
      blogCount: 8,
      seoMetrics: { pageSpeed: 85, keywordRank: 10 },
      status: "ACTIVE",
      addedAt: "2024-06-01",
    },
    {
      id: "2",
      tenantId: "t2",
      url: "techcorp.in",
      mediaCount: 10,
      blogCount: 5,
      seoMetrics: { pageSpeed: 78, keywordRank: 15 },
      status: "MAINTENANCE",
      addedAt: "2024-05-15",
    },
    {
      id: "3",
      tenantId: "t2",
      url: "styleboutique.co.in",
      mediaCount: 8,
      blogCount: 12,
      seoMetrics: { pageSpeed: 90, keywordRank: 8 },
      status: "ACTIVE",
      addedAt: "2024-06-10",
    },
  ],
  auditLogs: [
    {
      id: "log1",
      tenantId: "t1",
      action: "WEBSITE_ADDED",
      userId: "u1",
      timestamp: "2024-06-01T10:00:00Z",
      entity: "gocredo.in",
      metadata: { ip: "192.168.1.1" },
    },
    {
      id: "log2",
      tenantId: "t2",
      action: "WEBSITE_UPDATED",
      userId: "u2",
      timestamp: "2024-06-02T12:00:00Z",
      entity: "techcorp.in",
      metadata: { ip: "192.168.1.2", changes: { status: "MAINTENANCE" } },
    },
  ],
};

export default function WebsiteManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenantFilter, setTenantFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" }>({
    key: "url",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const itemsPerPage = 10;

  // Sorting
  const requestSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Filtering
  const filteredWebsites = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return data.websites
      .filter(
        (w) =>
          w.url.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (tenantFilter === "all" || w.tenantId === tenantFilter) &&
          (statusFilter === "all" || w.status === statusFilter) &&
          (!startDate || new Date(w.addedAt) >= startDate) &&
          (!endDate || new Date(w.addedAt) <= endDate)
      )
      .sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, tenantFilter, statusFilter, dateRange, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredWebsites.length / itemsPerPage);
  const paginatedWebsites = filteredWebsites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chart Data
  const statusDistributionChart = {
    labels: ["Active", "Maintenance", "Inactive"],
    datasets: [
      {
        data: [
          filteredWebsites.filter((w) => w.status === "ACTIVE").length,
          filteredWebsites.filter((w) => w.status === "MAINTENANCE").length,
          filteredWebsites.filter((w) => w.status === "INACTIVE").length,
        ],
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  const contentTrendChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Media Count",
        data: [5, 7, 9, 10, 12, 15],
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Blog Count",
        data: [3, 4, 6, 8, 10, 12],
        borderColor: "rgba(236, 72, 153, 1)",
        backgroundColor: "rgba(236, 72, 153, 0.2)",
        fill: true,
        tension: 0.4,
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

  // Handlers
  const handleExport = useCallback(() => {
    const csvData = filteredWebsites.map((w) => ({
      URL: w.url,
      Tenant: data.tenants.find((t) => t.id === w.tenantId)?.name,
      MediaCount: w.mediaCount,
      BlogCount: w.blogCount,
      PageSpeed: w.seoMetrics.pageSpeed,
      KeywordRank: w.seoMetrics.keywordRank,
      Status: w.status,
      AddedAt: w.addedAt,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "websites.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredWebsites]);

  const generateWebsiteReportPDF = useCallback((website: Website) => {
    const tenant = data.tenants.find((t) => t.id === website.tenantId);
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="font-family: Arial; padding: 20px; background: #fff; color: #000;">
        <h2 style="color: #A855F7;">GoCredo Website Report: ${website.url}</h2>
        <p><strong>Tenant:</strong> ${tenant?.name}</p>
        <p><strong>URL:</strong> ${website.url}</p>
        <p><strong>Media Count:</strong> ${website.mediaCount}</p>
        <p><strong>Blog Count:</strong> ${website.blogCount}</p>
        <p><strong>Page Speed:</strong> ${website.seoMetrics.pageSpeed}/100</p>
        <p><strong>Keyword Rank:</strong> ${website.seoMetrics.keywordRank}</p>
        <p><strong>Status:</strong> ${website.status}</p>
        <p><strong>Added:</strong> ${website.addedAt}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;
    html2pdf().from(element).save(`website_${website.id}.pdf`);
  }, []);

  const handleViewWebsite = useCallback((website: Website) => {
    setSelectedWebsite(website);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        GoCredo Website Management
      </motion.h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Input
            placeholder="Search websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-gray-900 border-gray-700 text-white"
          />
          <Select value={tenantFilter} onValueChange={setTenantFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Filter by Tenant" />
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
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
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-700 bg-gray-900 text-white"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Plus className="mr-2 h-4 w-4" />
                Add Website
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <h2 className="text-lg font-semibold">Add New Website</h2>
              <form className="space-y-4">
                <Select>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Tenant" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {data.tenants.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Website URL (e.g., example.in)"
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                  onClick={() => alert("Website added")}
                >
                  Add
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("url")}
              >
                Website URL{sortConfig.key === "url" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300">Tenant</TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("mediaCount")}
              >
                Media Count
                {sortConfig.key === "mediaCount" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("blogCount")}
              >
                Blog Count
                {sortConfig.key === "blogCount" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300">Page Speed</TableHead>
              <TableHead className="text-gray-300">Keyword Rank</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("addedAt")}
              >
                Added At
                {sortConfig.key === "addedAt" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
              </TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedWebsites.map((website, index) => (
              <motion.tr
                key={website.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-blue-500">{website.url}</TableCell>
                <TableCell className="text-white">
                  {data.tenants.find((t) => t.id === website.tenantId)?.name}
                </TableCell>
                <TableCell className="text-white">{website.mediaCount}</TableCell>
                <TableCell className="text-white">{website.blogCount}</TableCell>
                <TableCell className="text-white">{website.seoMetrics.pageSpeed}/100</TableCell>
                <TableCell className="text-white">{website.seoMetrics.keywordRank}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      website.status === "ACTIVE"
                        ? "bg-green-500"
                        : website.status === "MAINTENANCE"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    {website.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400">{website.addedAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                      <DropdownMenuItem onClick={() => handleViewWebsite(website)}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => generateWebsiteReportPDF(website)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Editing ${website.url}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Deleting ${website.url}`)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
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

      {/* Charts */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Website Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie
            data={statusDistributionChart}
            options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }}
          />
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Content Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={contentTrendChart} options={chartOptions} />
        </CardContent>
      </Card>

      {/* Website Details Drawer */}
      {selectedWebsite && (
        <Drawer open={!!selectedWebsite} onOpenChange={() => setSelectedWebsite(null)}>
          <DrawerContent className="bg-gray-900 border-gray-800 text-white">
            <DrawerHeader>
              <DrawerTitle>{selectedWebsite.url}</DrawerTitle>
              <DrawerDescription>Website Details</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-gray-300">Tenant</label>
                <p className="text-white">
                  {data.tenants.find((t) => t.id === selectedWebsite.tenantId)?.name}
                </p>
              </div>
              <div>
                <label className="text-gray-300">Media Count</label>
                <p className="text-white">{selectedWebsite.mediaCount}</p>
              </div>
              <div>
                <label className="text-gray-300">Blog Count</label>
                <p className="text-white">{selectedWebsite.blogCount}</p>
              </div>
              <div>
                <label className="text-gray-300">SEO Metrics</label>
                <p className="text-white">Page Speed: {selectedWebsite.seoMetrics.pageSpeed}/100</p>
                <p className="text-white">Keyword Rank: {selectedWebsite.seoMetrics.keywordRank}</p>
              </div>
              <div>
                <label className="text-gray-300">Status</label>
                <p className="text-white">{selectedWebsite.status}</p>
              </div>
              <div>
                <label className="text-gray-300">Added At</label>
                <p className="text-white">{selectedWebsite.addedAt}</p>
              </div>
              <div>
                <label className="text-gray-300">Audit Logs</label>
                <ul className="space-y-2">
                  {data.auditLogs
                    .filter((log) => log.entity === selectedWebsite.url)
                    .map((log) => (
                      <li key={log.id} className="text-gray-300">
                        {log.action.replace("_", " ")} by {log.userId} on{" "}
                        {new Date(log.timestamp).toLocaleString()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <DrawerFooter>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Edit Website</Button>
              <Button
                variant="outline"
                className="border-gray-700 bg-gray-900 text-white"
                onClick={() => setSelectedWebsite(null)}
              >
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}