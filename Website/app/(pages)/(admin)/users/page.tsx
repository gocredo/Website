
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Download, Plus } from "lucide-react";
import Papa from "papaparse";
import { UserFilters } from "../../../../components/admin/user/user-filter";
import { UserTable } from "../../../../components/admin/user/user-table";
import { UserDrawer } from "../../../../components/admin/user/user-drawer";
import { UserChart } from "../../../../components/admin/user/user-chart";
import { User, SortKey, SortConfig, UserFormData } from "../../../../components/admin/user/type";
import { useForm, Controller } from "react-hook-form";
import { Drawer } from "components/ui/drawer";
import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 10;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    defaultValues: { name: "", email: "", role: "STAFF", businessId: "" },
  });

  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "Vishal",
      email: "vishal@goCredo.in",
      role: "ADMIN",
      businessId: "123",
      businessName: "TechCorp",
      status: "ACTIVE",
      lastActive: "2025-06-01",
      tasksCompleted: 50,
      revenueGenerated: 500000,
      activity: [
        { id: "a1", action: "Logged in", timestamp: "2025-06-01 10:00" },
        { id: "a2", action: "Updated business settings", timestamp: "2025-05-31 15:30" },
      ],
      notifications: [
        { id: "n1", message: "New business assigned", timestamp: "2025-06-01 09:00" },
      ],
    },
    {
      id: "2",
      name: "Akshansh",
      email: "akshansh@goCredo.in",
      role: "OWNER",
      businessId: "456",
      businessName: "StyleBoutique",
      status: "ACTIVE",
      lastActive: "2025-05-30",
      tasksCompleted: 30,
      revenueGenerated: 300000,
      activity: [
        { id: "a3", action: "Created invoice", timestamp: "2025-05-30 12:00" },
      ],
      notifications: [
        { id: "n2", message: "Invoice payment received", timestamp: "2025-05-30 14:00" },
      ],
    },
    {
      id: "3",
      name: "Alok",
      email: "alok@goCredo.in",
      role: "STAFF",
      businessId: "456",
      businessName: "StyleBoutique",
      status: "INACTIVE",
      lastActive: "2025-05-28",
      tasksCompleted: 10,
      revenueGenerated: 100000,
      activity: [
        { id: "a4", action: "Updated customer profile", timestamp: "2025-05-28 11:00" },
      ],
      notifications: [],
    },
    ...Array.from({ length: 17 }, (_, i) => ({
      id: `${i + 4}`,
      name: `User ${i + 4}`,
      email: `user${i + 4}@goCredo.in`,
      role: ["ADMIN", "OWNER", "STAFF"][i % 3] as "ADMIN" | "OWNER" | "STAFF",
      businessId: `${123 + (i % 2) * 333}`,
      businessName: ["TechCorp", "StyleBoutique"][i % 2],
      status: (i % 4 === 0 ? "INACTIVE" : "ACTIVE") as "ACTIVE" | "INACTIVE",
      lastActive: `2025-05-${30 - (i % 10)}`,
      tasksCompleted: 10 + i * 5,
      revenueGenerated: 100000 + i * 50000,
      activity: [
        {
          id: `a${i + 5}`,
          action: "Sample activity",
          timestamp: `2025-05-${30 - (i % 10)} 09:00`,
        },
      ],
      notifications: [],
    })),
  ];

  // Reset currentPage when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, businessFilter, statusFilter, dateRange]);

  // Filtering and sorting
  const filteredUsers = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (roleFilter === "all" || u.role === roleFilter) &&
          (businessFilter === "all" || u.businessId === businessFilter) &&
          (statusFilter === "all" || u.status === statusFilter) &&
          (!startDate || new Date(u.lastActive) >= startDate) &&
          (!endDate || new Date(u.lastActive) <= endDate)
      )
      .sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? aValue < bValue ? -1 : 1
          : aValue > bValue ? -1 : 1;
      });
  }, [users, searchTerm, roleFilter, businessFilter, statusFilter, dateRange, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const requestSort = useCallback((key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const handleBulkAction = useCallback((action: "delete" | "activate" | "deactivate") => {
    if (action === "delete") {
      alert(`Deleting ${selectedUsers.length} users`);
    } else if (action === "activate") {
      alert(`Activating ${selectedUsers.length} users`);
    } else {
      alert(`Deactivating ${selectedUsers.length} users`);
    }
    setSelectedUsers([]);
  }, [selectedUsers]);

  const handleExport = useCallback(() => {
    const csvData = filteredUsers.map((u) => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Business: u.businessName,
      Status: u.status,
      LastActive: u.lastActive,
      TasksCompleted: u.tasksCompleted,
      RevenueGenerated: u.revenueGenerated,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredUsers]);

  const handleViewDetails = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const onSubmit = useCallback((data: UserFormData) => {
    console.log("Creating user:", {
      ...data,
      id: `user-${Date.now()}`,
      status: "ACTIVE",
      lastActive: new Date().toISOString().split("T")[0],
      tasksCompleted: 0,
      revenueGenerated: 0,
      activity: [],
      notifications: [],
      businessName: users.find((u) => u.businessId === data.businessId)?.businessName || "",
    });
    alert("User created");
    reset();
  }, [reset, users]);

  return (
    <main className="flex-1 p-6 bg-gray-900 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        User Management
      </motion.h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          businessFilter={businessFilter}
          setBusinessFilter={setBusinessFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          users={users}
        />
        <div className="flex items-center gap-2">
          {selectedUsers.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 bg-gray-900 text-white">
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                <DropdownMenuItem onClick={() => handleBulkAction("delete")}>Delete Selected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("activate")}>Activate Selected</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("deactivate")}>Deactivate Selected</DropdownMenuItem>
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
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Email"
                        type="email"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {["ADMIN", "OWNER", "STAFF"].map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="businessId"
                  control={control}
                  rules={{ required: "Business is required" }}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Business" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {[...new Set(users.map((u) => ({ id: u.businessId, name: u.businessName })))].map(
                            ({ id, name }) => (
                              <SelectItem key={id} value={id}>
                                {name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                      )}
                    </div>
                  )}
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
      <Card className="bg-gray-900 border-gray-800">
        <UserTable
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          sortConfig={sortConfig}
          requestSort={requestSort}
          handleViewDetails={handleViewDetails}
        />
      </Card>
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-gray-700 bg-gray-900 text-white"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
        <Button
          variant="outline"
          className="border-gray-700 bg-gray-900 text-white"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
      <UserChart users={filteredUsers} />
      <UserDrawer user={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
    </main>
  );
}
