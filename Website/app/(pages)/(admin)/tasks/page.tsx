"use client";

import {
  Badge,
} from "../../../../components/ui/badge";
import {
  Button,
} from "../../../../components/ui/button";
import {
  Input,
} from "../../../../components/ui/input";
import {
  Card,
} from "../../../../components/ui/card";
import { Filter, Plus, Table } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table";

export default function AdminManagement() {
  const admins = [
    {
      id: 1,
      name: "Vishal",
      email: "vishal@gmail.com",
      contact: "+91 98990 32076",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Akshansh",
      email: "akshansh@gmail.com",
      contact: "+91 79760 26974",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Gaurav",
      email: "gaurav@gmail.com",
      contact: "+91-87640 60308",
      role: "Admin",
      status: "Inactive",
      lastLogin: "2024-01-10",
    },
    {
      id: 4,
      name: "Alok",
      email: "alok@gmail.com",
      contact: "+91-88828 06064",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
    {
      id: 5,
      name: "Lokesh",
      email: "lokesh@gmail.com",
      contact: "+91 73748 58293",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
    {
      id: 6,
      name: "Sachin",
      email: "sachin@gmail.com",
      contact: "+91 97990 54818",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl text-foreground">Admin Management</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search admins..."
          className="max-w-sm bg-card border-border text-foreground placeholder:text-muted-foreground"
        />
        <Button variant="outline" className="border-border bg-card text-foreground hover:bg-accent">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>
      <Card className="bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Contact</TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id} className="border-border">
                <TableCell className="font-medium text-foreground">{admin.name}</TableCell>
                <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                <TableCell className="text-muted-foreground">{admin.contact}</TableCell>
                <TableCell>
                  <Badge
                    variant={admin.role === "Super Admin" ? "default" : "secondary"}
                    className="bg-accent text-accent-foreground"
                  >
                    {admin.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={admin.status === "Active" ? "default" : "destructive"}
                    className={admin.status === "Active" ? "bg-green-600" : "bg-destructive"}
                  >
                    {admin.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{admin.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}