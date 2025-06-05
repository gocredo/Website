"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Skeleton } from "components/ui/skeleton";

interface ExtendedUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName?: string;
  lastName?: string;
  publicMetadata: {
    role?: string;
  };
}

interface UserManagementProps {
  users: ExtendedUser[];
  editingUserId: string | null;
  selectedRole: string;
  setState: (state: any) => void;
  handleRoleUpdate: (userId: string) => void;
  isFetching: boolean;
}

export function UserManagement({ users, editingUserId, selectedRole, setState, handleRoleUpdate, isFetching }: UserManagementProps) {
  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-white">User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/50">
                <TableHead className="text-gray-200 font-medium">Email</TableHead>
                <TableHead className="text-gray-200 font-medium">Name</TableHead>
                <TableHead className="text-gray-200 font-medium">Role</TableHead>
                <TableHead className="text-gray-200 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching && users.length === 0 ? (
                Array(3).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-6 w-48 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-32 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 bg-gray-700" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-24 bg-gray-700" /></TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-400">No users found.</TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-800/50 transition-colors">
                    <TableCell className="text-gray-200">
                      {user.emailAddresses?.[0]?.emailAddress || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-200">
                      {user.firstName || user.lastName
                        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-200">
                      {editingUserId === user.id ? (
                        <Select
                          value={selectedRole || user.publicMetadata?.role || "user"}
                          onValueChange={(value) => setState((prev: any) => ({ ...prev, selectedRole: value }))}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-gray-200 focus:ring-2 focus:ring-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600 text-gray-200">
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        user.publicMetadata?.role || "user"
                      )}
                    </TableCell>
                    <TableCell>
                      {editingUserId === user.id ? (
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleRoleUpdate(user.id)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setState((prev: any) => ({ ...prev, editingUserId: null, selectedRole: "" }))}
                            variant="outline"
                            className="border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setState((prev: any) => ({ ...prev, editingUserId: user.id }))}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-medium"
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}