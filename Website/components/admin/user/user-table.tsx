
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "../../../components/ui/table";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { User, SortKey, SortConfig } from "./type";
import { MoreHorizontal, User as UserIcon, Edit, Trash, BarChart } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserTableProps {
  users: User[];
  selectedUsers: string[];
  setSelectedUsers: (ids: string[]) => void;
  sortConfig: SortConfig;
  requestSort: (key: SortKey) => void;
  handleViewDetails: (user: User) => void;
}

export function UserTable({
  users,
  selectedUsers,
  setSelectedUsers,
  sortConfig,
  requestSort,
  handleViewDetails,
}: UserTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-800">
          <TableHead>
            <Checkbox
              checked={selectedUsers.length === users.length && users.length > 0}
              onCheckedChange={(checked: boolean) =>
                setSelectedUsers(checked ? users.map((u) => u.id) : [])
              }
              aria-label="Select all users"
            />
          </TableHead>
          <TableHead
            className="text-gray-300 cursor-pointer"
            onClick={() => requestSort("name")}
            aria-sort={sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
          >
            Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="text-gray-300 cursor-pointer"
            onClick={() => requestSort("email")}
            aria-sort={sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
          >
            Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead
            className="text-gray-300 cursor-pointer"
            onClick={() => requestSort("role")}
            aria-sort={sortConfig.key === "role" ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
          >
            Role {sortConfig.key === "role" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead className="text-gray-300">Business</TableHead>
          <TableHead className="text-gray-300">Tasks</TableHead>
          <TableHead className="text-gray-300">Revenue</TableHead>
          <TableHead className="text-gray-300">Status</TableHead>
          <TableHead
            className="text-gray-300 cursor-pointer"
            onClick={() => requestSort("lastActive")}
            aria-sort={sortConfig.key === "lastActive" ?(sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
          >
            Last Active {sortConfig.key === "lastActive" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead className="text-gray-300">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <motion.tr
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border-gray-800 hover:bg-gray-800"
          >
            <TableCell>
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onCheckedChange={() =>
                  setSelectedUsers(
                    selectedUsers.includes(user.id)
                      ? selectedUsers.filter((id) => id !== user.id)
                      : [...selectedUsers, user.id]
                  )
                }
                aria-label={`Select user ${user.name}`}
              />
            </TableCell>
            <TableCell
              className="text-white cursor-pointer"
              onClick={() => handleViewDetails(user)}
            >
              {user.name}
            </TableCell>
            <TableCell className="text-gray-400">{user.email}</TableCell>
            <TableCell>
              <Badge
                className={
                  user.role === "ADMIN"
                    ? "bg-purple-500"
                    : user.role === "OWNER"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-400">{user.businessName}</TableCell>
            <TableCell className="text-white">{user.tasksCompleted}</TableCell>
            <TableCell className="text-white">₹{user.revenueGenerated.toLocaleString()}</TableCell>
            <TableCell>
              <Badge className={user.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-400">{user.lastActive}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                  <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Editing ${user.name}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Deleting ${user.name}`)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/analytics?userId=${user.id}`)}>
                    <BarChart className="mr-2 h-4 w-4" />
                    View Analytics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </motion.tr>
        ))}
      </TableBody>
    </Table>
  );
}
