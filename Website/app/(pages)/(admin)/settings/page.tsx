"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { useToast } from "../../../../lib/toast/useToast";

// Interface for user data from API
interface ExtendedUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName?: string;
  lastName?: string;
  publicMetadata: {
    role?: string;
  };
}

export default function Settings() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { toast } = useToast(); // Destructure toast function
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  // State for Global Settings
  const [emailTemplate, setEmailTemplate] = useState("");
  const [apiKey, setApiKey] = useState("");

  // Redirect non-admins
  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata?.role !== "admin")) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You do not have permission to access this page.",
      });
      router.replace("/?error=You do not have permission to access this page.");
    }
  }, [isLoaded, user, router, toast]);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      if (!isLoaded || !user || user.publicMetadata?.role !== "admin") return;

      try {
        setLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const usersData: ExtendedUser[] = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("[Settings] Error fetching users:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch users. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [isLoaded, user, toast]);

  // Handle role update
  const handleRoleUpdate = async (userId: string) => {
    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a role.",
      });
      return;
    }

    try {
      const response = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: selectedRole }),
      });
      if (!response.ok) throw new Error("Failed to update user role");
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, publicMetadata: { ...u.publicMetadata, role: selectedRole } } : u
        )
      );
      setEditingUserId(null);
      setSelectedRole("");
      toast({
        variant: "success",
        title: "Success",
        description: "User role updated successfully.",
      });
    } catch (error) {
      console.error("[Settings] Error updating user role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role. Please try again.",
      });
    }
  };

  // Handle global settings save (placeholder)
  const handleSaveGlobalSettings = () => {
    toast({
      variant: "success",
      title: "Success",
      description: "Global settings saved successfully.",
    });
  };

  if (!isLoaded || loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="users" className="text-white">User Management</TabsTrigger>
          <TabsTrigger value="global" className="text-white">Global Settings</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Role</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-white">
                          {user.emailAddresses?.[0]?.emailAddress || "N/A"}
                        </TableCell>
                        <TableCell className="text-white">
                          {user.firstName || user.lastName
                            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-white">
                          {editingUserId === user.id ? (
                            <Select
                              value={selectedRole || user.publicMetadata?.role || "user"}
                              onValueChange={setSelectedRole}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
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
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleRoleUpdate(user.id)}
                                className="bg-gradient-to-r from-purple-500 to-blue-500"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditingUserId(null);
                                  setSelectedRole("");
                                }}
                                variant="outline"
                                className="border-gray-700 text-white"
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => setEditingUserId(user.id)}
                              className="bg-gray-700 text-white"
                            >
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Settings Tab */}
        <TabsContent value="global">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Global Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Email Template"
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Input
                  placeholder="API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button
                  onClick={handleSaveGlobalSettings}
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}