
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Download, Eye, Users, Activity, DollarSign, Mail, ShoppingCart } from "lucide-react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [businessFilter, setBusinessFilter] = useState("all");
  const [dateRange, setDateRange] = useState("30d");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data aligned with Prisma schema
  const analyticsData = [
    {
      businessId: "1",
      name: "TechCorp",
      website: {
        views: 10000,
        visitors: 8000,
        bounceRate: 30,
        sessionDuration: "3m 45s",
      },
      customers: {
        total: 500,
        newLeads: 50,
        conversionRate: 5,
        retentionRate: 80,
      },
      sales: {
        orders: 200,
        revenue: 500000,
        avgOrderValue: 2500,
      },
      campaigns: {
        emailOpenRate: 25,
        clickThroughRate: 10,
        conversionRate: 3,
      },
    },
    {
      businessId: "2",
      name: "StyleBoutique",
      website: {
        views: 8500,
        visitors: 6500,
        bounceRate: 35,
        sessionDuration: "2m 50s",
      },
      customers: {
        total: 300,
        newLeads: 30,
        conversionRate: 4,
        retentionRate: 75,
      },
      sales: {
        orders: 150,
        revenue: 300000,
        avgOrderValue: 2000,
      },
      campaigns: {
        emailOpenRate: 20,
        clickThroughRate: 8,
        conversionRate: 2,
      },
    },
  ];

  // Filter and paginate data
  const filteredData = analyticsData.filter(
    (item) =>
      (businessFilter === "all" || item.businessId === businessFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chart data
  const websiteViewsChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Page Views",
        data: [5000, 6000, 7500, 8000, 9000, 10000],
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const trafficSourcesChart = {
    labels: ["Organic Search", "Direct", "Social Media", "Referral"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#A855F7", "#EC4899", "#60A5FA", "#34D399"],
      },
    ],
  };

  const salesByBusinessChart = {
    labels: analyticsData.map((item) => item.name),
    datasets: [
      {
        label: "Revenue (₹)",
        data: analyticsData.map((item) => item.sales.revenue),
        backgroundColor: "rgba(168, 85, 247, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } },
      x: { grid: { display: false }, ticks: { color: "white" } },
    },
  };

  const handleExport = () => {
    // Placeholder for export functionality (e.g., CSV download)
    alert("Exporting report...");
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        CRM Analytics
      </motion.h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Select value={businessFilter} onValueChange={setBusinessFilter}>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Select Business" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Businesses</SelectItem>
              {analyticsData.map((item) => (
                <SelectItem key={item.businessId} value={item.businessId}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search businesses..."
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

      {/* Tabs for Different Analytics */}
      <Tabs defaultValue="website" className="w-full">
        <TabsList className="bg-gray-950 border-gray-800">
          <TabsTrigger value="website" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
            Website
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
            Customers
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
            Sales
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
            Campaigns
          </TabsTrigger>
        </TabsList>

        {/* Website Analytics */}
        <TabsContent value="website">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {filteredData.reduce((sum, item) => sum + item.website.views, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {filteredData.reduce((sum, item) => sum + item.website.visitors, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Bounce Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.website.bounceRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Avg. Session</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3m 15s</div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Website Views Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={websiteViewsChart} options={chartOptions} />
            </CardContent>
          </Card>
          <Card className="mt-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={trafficSourcesChart} options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Analytics */}
        <TabsContent value="customers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {filteredData.reduce((sum, item) => sum + item.customers.total, 0)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">New Leads</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {filteredData.reduce((sum, item) => sum + item.customers.newLeads, 0)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.customers.conversionRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Retention Rate</CardTitle>
                <Activity className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.customers.retentionRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Customer Acquisition Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "New Customers",
                      data: [100, 120, 150, 180, 200, 220],
                      borderColor: "rgba(236, 72, 153, 1)",
                      backgroundColor: "rgba(236, 72, 153, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Analytics */}
        <TabsContent value="sales">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {filteredData.reduce((sum, item) => sum + item.sales.orders, 0)}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{filteredData.reduce((sum, item) => sum + item.sales.revenue, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Avg. Order Value</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{(
                    filteredData.reduce((sum, item) => sum + item.sales.avgOrderValue, 0) / filteredData.length
                  ).toFixed(0)}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Revenue by Business</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={salesByBusinessChart} options={chartOptions} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaign Analytics */}
        <TabsContent value="campaigns">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Email Open Rate</CardTitle>
                <Mail className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.campaigns.emailOpenRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Click-Through Rate</CardTitle>
                <Mail className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.campaigns.clickThroughRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
                <Mail className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {(
                    filteredData.reduce((sum, item) => sum + item.campaigns.conversionRate, 0) / filteredData.length
                  ).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Campaign Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      label: "Email Open Rate (%)",
                      data: [15, 18, 20, 22, 24, 25],
                      borderColor: "rgba(168, 85, 247, 1)",
                      backgroundColor: "rgba(168, 85, 247, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                    {
                      label: "Click-Through Rate (%)",
                      data: [5, 6, 7, 8, 9, 10],
                      borderColor: "rgba(236, 72, 153, 1)",
                      backgroundColor: "rgba(236, 72, 153, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">Business</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="text-gray-300">Visitors</TableHead>
                <TableHead className="text-gray-300">Bounce Rate</TableHead>
                <TableHead className="text-gray-300">Customers</TableHead>
                <TableHead className="text-gray-300">Orders</TableHead>
                <TableHead className="text-gray-300">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <motion.tr
                  key={item.businessId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-gray-800 hover:bg-gray-800"
                >
                  <TableCell className="text-white">{item.name}</TableCell>
                  <TableCell className="text-white">{item.website.views.toLocaleString()}</TableCell>
                  <TableCell className="text-white">{item.website.visitors.toLocaleString()}</TableCell>
                  <TableCell className="text-white">{item.website.bounceRate}%</TableCell>
                  <TableCell className="text-white">{item.customers.total}</TableCell>
                  <TableCell className="text-white">{item.sales.orders}</TableCell>
                  <TableCell className="text-white">₹{item.sales.revenue.toLocaleString()}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
