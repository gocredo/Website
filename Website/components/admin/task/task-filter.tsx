
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFiltersProps {
  tenantFilter: string;
  setTenantFilter: (value: string) => void;
  assigneeFilter: string;
  setAssigneeFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  tenants: { id: string; name: string }[];
  assignees: { id: string; name: string }[];
}

export function TaskFilters({
  tenantFilter,
  setTenantFilter,
  assigneeFilter,
  setAssigneeFilter,
  priorityFilter,
  setPriorityFilter,
  dateRange,
  setDateRange,
  tagFilter,
  setTagFilter,
  searchTerm,
  setSearchTerm,
  tenants,
  assignees,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <Input
        placeholder="Search tasks..."
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
      <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
        <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
          <SelectValue placeholder="Filter by Assignee" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700 text-white">
          <SelectItem value="all">All Assignees</SelectItem>
          {assignees.map((a) => (
            <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
          <SelectValue placeholder="Filter by Priority" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700 text-white">
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>
      <DatePicker
        selectsRange
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={setDateRange}
        placeholderText="Select Due Date Range"
        className="w-[200px] bg-gray-900 border-gray-700 text-white p-2 rounded-md"
      />
      <Input
        placeholder="Filter by Tag"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        className="w-[180px] bg-gray-900 border-gray-700 text-white"
      />
    </div>
  );
}