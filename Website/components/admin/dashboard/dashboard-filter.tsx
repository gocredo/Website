import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Input } from "../../ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DashboardFiltersProps {
  tenantFilter: string;
  setTenantFilter: (value: string) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  tenants: { id: string; name: string }[];
}

export function DashboardFilters({
  tenantFilter,
  setTenantFilter,
  dateRange,
  setDateRange,
  searchTerm,
  setSearchTerm,
  tenants,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Input
          placeholder="Search..."
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
            {tenants.map((t) => (
              <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
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
      </div>
    </div>
  );
}