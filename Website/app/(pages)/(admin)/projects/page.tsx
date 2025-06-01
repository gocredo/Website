"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Button,
} from "../../../../components/ui/button";
import {
  Input,
} from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Plus, Eye, Edit } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Badge } from "../../../../components/ui/badge";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp Inc.",
      status: "Active",
      progress: "75%",
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      name: "Mobile App",
      client: "StartupXYZ",
      status: "Completed",
      progress: "100%",
      dueDate: "2024-01-30",
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "RetailCo",
      status: "On Hold",
      progress: "45%",
      dueDate: "2024-03-20",
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Project Management
      </motion.h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-900 border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45</div>
              <p className="text-xs text-gray-400">+5 from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">32</div>
              <p className="text-xs text-gray-400">71% of total projects</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800 shadow-md">
            <CardHeader>
              <CardTitle className="text-white">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">13</div>
              <p className="text-xs text-gray-400">Successfully delivered</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Card className="bg-gray-900 border-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-white">Project Overview</CardTitle>
          <CardDescription className="text-gray-400">Manage your project portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search projects..."
                  className="max-w-sm bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select onValueChange={setStatusFilter} defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 text-white">
                  <h2 className="text-lg font-semibold">Add New Project</h2>
                  <form className="space-y-4">
                    <Input placeholder="Project Name" className="bg-gray-800 border-gray-700 text-white" />
                    <Input placeholder="Client" className="bg-gray-800 border-gray-700 text-white" />
                    <Input placeholder="Due Date" type="date" className="bg-gray-800 border-gray-700 text-white" />
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800">
                  <TableHead className="text-gray-300">Project Name</TableHead>
                  <TableHead className="text-gray-300">Client</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Progress</TableHead>
                  <TableHead className="text-gray-300">Due Date</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project, index) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-gray-800 hover:bg-gray-800"
                  >
                    <TableCell className="font-medium text-white">{project.name}</TableCell>
                    <TableCell className="text-gray-300">{project.client}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          project.status === "Active"
                            ? "bg-blue-600"
                            : project.status === "Completed"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{project.progress}</TableCell>
                    <TableCell className="text-gray-300">{project.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}