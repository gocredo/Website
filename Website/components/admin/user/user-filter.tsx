
import { useState, ChangeEvent } from "react";
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { User, UserRole, UserStatus } from "./type";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  businessFilter: string;
  setBusinessFilter: (business: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  users: User[];
}

export function UserFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  businessFilter,
  setBusinessFilter,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  users,
}: UserFiltersProps) {
  const businesses = [...new Set(users.map((u) => ({ id: u.businessId, name: u.businessName })))];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="max-w-sm bg-gray-900 border-gray-700 text-white"
        aria-label="Search users"
      />
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700 text-white">
          <SelectItem value="all">All Roles</SelectItem>
          {["ADMIN", "OWNER", "STAFF"].map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={businessFilter} onValueChange={setBusinessFilter}>
        <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
          <SelectValue placeholder="Business" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700 text-white">
          <SelectItem value="all">All Businesses</SelectItem>
          {businesses.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
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
        selectsRange
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={setDateRange}
        placeholderText="Select last active range"
        className="bg-gray-900 border-gray-700 text-white p-2 rounded-md w-[200px]"
        aria-label="Select last active range"
      />
    </div>
  );
}