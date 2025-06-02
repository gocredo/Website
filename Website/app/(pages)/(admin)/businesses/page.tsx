
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {

  Badge,
} from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Checkbox,} from "../../../../components/ui/checkbox";
import {  Input,
  } from "../../../../components/ui/input";
import { Card,
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
import { Plus, Filter, MoreHorizontal, Download, Edit, Trash, BarChart, FileText } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

type Business = {
  id: string;
  name: string;
  category: string;
  websiteUrl: string;
  createdAt: string;
  status: string;
  views: number;
  revenue: number;
  branches: { id: string; name: string; address: string }[];
  settings: { currency: string; timezone: string };
  about: { description: string };
};

type SortableBusinessKeys = "name" | "category" | "websiteUrl" | "createdAt";

type SortConfig = {
  key: SortableBusinessKeys;
  direction: "asc" | "desc";
};

export default function Businesses() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const itemsPerPage = 10;

  // Mock data aligned with Prisma schema
  const businesses: Business[] = [
    {
      id: "1",
      name: "TechCorp",
      category: "RESTAURANT",
      websiteUrl: "techcorp.in",
      createdAt: "2024-01-01",
      status: "ACTIVE",
      views: 10000,
      revenue: 500000,
      branches: [{ id: "b1", name: "Main Branch", address: "Mumbai" }],
      settings: { currency: "INR", timezone: "Asia/Kolkata" },
      about: { description: "Leading tech restaurant" },
    },
    {
      id: "2",
      name: "StyleBoutique",
      category: "BOUTIQUE",
      websiteUrl: "styleboutique.in",
      createdAt: "2024-02-01",
    status: "ACTIVE",
    views: 8500,
    revenue: 200000,
    branches: [{ id: "b2", name: "Branch 2", address: "Delhi" }],
    settings: { currency: "INR", timezone: "Asia/Kolkata" },
    about: { description: "Trendy boutique" },
  },
  // Add more mock businesses as needed
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 3}`,
    name: `Business ${i + 3}`,
    category: ["RESTAURANT", "BOUTIQUE", "SALON", "GYM"][i % 4],
    websiteUrl: `business${i + 3}.in`,
    createdAt: `2024-0${(i % 6) + 1}-15`,
    status: i % 2 === 0 ? "ACTIVE" : "INACTIVE",
    views: 5000 + i * 1000,
    revenue: 200000 + i * 50000,
    branches: [{ id: `b${i + 3}`, name: `Branch ${i + 3}`, address: "City" }],
    settings: { currency: "INR", timezone: "Asia/Kolkata" },
    about: { description: `Description for Business ${i + 3}` },
  })),
];

  // Sorting logic
  const sortedBusinesses = useMemo(() => {
    const sortableItems = [...businesses];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [sortConfig, businesses]);

  // Filtering logic
  const filteredBusinesses = sortedBusinesses.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || b.category === categoryFilter) &&
      (statusFilter === "all" || b.status === statusFilter) &&
      (!startDate || new Date(b.createdAt) >= startDate) &&
      (!endDate || new Date(b.createdAt) <= endDate)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const paginatedBusinesses = filteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting
  const requestSort = (key: SortableBusinessKeys) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      alert(`Deleting ${selectedBusinesses.length} businesses`);
    } else if (action === "activate") {
      alert(`Activating ${selectedBusinesses.length} businesses`);
    } else if (action === "deactivate") {
      alert(`Deactivating ${selectedBusinesses.length} businesses`);
    }
    setSelectedBusinesses([]);
  };

  // Handle export
  const handleExport = () => {
    const csvData = filteredBusinesses.map((b) => ({
      ID: b.id,
      Name: b.name,
      Category: b.category,
      Website: b.websiteUrl,
      Status: b.status,
      CreatedAt: b.createdAt,
      Views: b.views,
      Revenue: b.revenue,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "businesses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle business selection
  const handleSelectBusiness = (id: string) => {
    setSelectedBusinesses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle view details
  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Business Management
      </motion.h1>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Input
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-gray-900 border-gray-700 text-white"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Categories</SelectItem>
              {["RESTAURANT", "BOUTIQUE", "SALON", "GYM"].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            placeholderText="Select date range"
            className="bg-gray-900 border-gray-700 text-white p-2 rounded-md w-[200px]"
          />
        </div>
        <div className="flex items-center gap-2">
          {selectedBusinesses.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 bg-gray-900 text-white">
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                <DropdownMenuItem onClick={() => handleBulkAction("delete")}>
                  Delete Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("activate")}>
                  Activate Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("deactivate")}>
                  Deactivate Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
                Add Business
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <h2 className="text-lg font-semibold">Add New Business</h2>
              <form className="space-y-4">
                <Input
                  placeholder="Name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {["RESTAURANT", "BOUTIQUE", "SALON", "GYM"].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Website URL"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input
                  placeholder="Description"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Business Table */}
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead>
                <Checkbox
                  checked={selectedBusinesses.length === filteredBusinesses.length}
                  onCheckedChange={(checked) =>
                    setSelectedBusinesses(
                      checked ? filteredBusinesses.map((b) => b.id) : []
                    )
                  }
                />
              </TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("category")}
              >
                Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("websiteUrl")}
              >
                Website URL {sortConfig.key === "websiteUrl" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-gray-300">Views</TableHead>
              <TableHead className="text-gray-300">Revenue</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead
                className="text-gray-300 cursor-pointer"
                onClick={() => requestSort("createdAt")}
              >
                Created At {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBusinesses.map((business, index) => (
              <motion.tr
                key={business.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-800 hover:bg-gray-800"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedBusinesses.includes(business.id)}
                    onCheckedChange={() => handleSelectBusiness(business.id)}
                  />
                </TableCell>
                <TableCell
                  className="text-white cursor-pointer"
                  onClick={() => handleViewDetails(business)}
                >
                  {business.name}
                </TableCell>
                <TableCell className="text-gray-300">{business.category}</TableCell>
                <TableCell className="text-blue-500">
                  <a href={`https://${business.websiteUrl}`} target="_blank" rel="noopener noreferrer">
                    {business.websiteUrl}
                  </a>
                </TableCell>
                <TableCell className="text-white">{business.views.toLocaleString()}</TableCell>
                <TableCell className="text-white">₹{business.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={business.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}>
                    {business.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">{business.createdAt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                      <DropdownMenuItem onClick={() => handleViewDetails(business)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => alert(`Deleting ${business.name}`)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/admin/analytics?businessId=${business.id}`)}>
                        <BarChart className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/admin/invoices?businessId=${business.id}`)}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Invoices
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

      {/* Business Details Drawer */}
      {selectedBusiness && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="bg-gray-900 border-gray-800 text-white">
            <DrawerHeader>
              <DrawerTitle>{selectedBusiness.name} Details</DrawerTitle>
              <DrawerDescription>View and edit business information</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-gray-300">Name</label>
                <Input
                  value={selectedBusiness.name}
                  className="bg-gray-800 border-gray-700 text-white"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-300">Category</label>
                <Input
                  value={selectedBusiness.category}
                  className="bg-gray-800 border-gray-700 text-white"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-300">Website URL</label>
                <Input
                  value={selectedBusiness.websiteUrl}
                  className="bg-gray-800 border-gray-700 text-white"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-300">Description</label>
                <Input
                  value={selectedBusiness.about.description}
                  className="bg-gray-800 border-gray-700 text-white"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-300">Branches</label>
                <ul className="list-disc pl-5 text-gray-300">
                  {selectedBusiness.branches.map((branch) => (
                    <li key={branch.id}>
                      {branch.name} - {branch.address}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="text-gray-300">Settings</label>
                <p className="text-gray-300">
                  Currency: {selectedBusiness.settings.currency}, Timezone: {selectedBusiness.settings.timezone}
                </p>
              </div>
            </div>
            <DrawerFooter>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => alert("Edit functionality to be implemented")}
              >
                Edit Business
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 bg-gray-900 text-white"
                onClick={() => setIsDrawerOpen(false)}
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
