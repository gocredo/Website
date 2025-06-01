"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Plus, Filter } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = [
    { id: "1", name: "Vishal", email: "vishal@goCredo.in", role: "ADMIN", businessId: "123" },
    { id: "2", name: "Akshansh", email: "akshansh@goCredo.in", role: "OWNER", businessId: "456" },
    { id: "3", name: "Alok", email: "alok@goCredo.in", role: "USER", businessId: "456" },
  ];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl">
        Users
      </motion.h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-gray-900 border-gray-700 text-white"
          />
          <Button variant="outline" className="border-gray-700 bg-gray-900 text-white hover:bg-gray-800">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="DialogContent bg-gray-800 text-white">
            <h2 className="text-lg font-semibold">Add New User</h2>
            <form className="form space-y-4">
              <input placeholder="Name" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <input placeholder="Email" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <select className="select bg-gray-800 border-gray-700 text-white w-full p-2 rounded">
                <option>Admin</option>
                <option>Business Owner</option>
                <option>Staff</option>
              </select>
              <button className="button w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded">
                Submit
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="Card bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="TableHead text-gray-300">Name</TableHead>
              <TableHead className="TableHead text-gray-300">Email</TableHead>
              <TableHead className="TableHead text-gray-300">Role</TableHead>
              <TableHead className="TableHead text-gray-300">Business ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="TableCell text-white">{user.name}</TableCell>
                <TableCell className="TableCell text-gray-400">{user.email}</TableCell>
                <TableCell>
                  <Badge className={user.role === "ADMIN" ? "bg-purple-500" : "bg-blue-500"}>{user.role}</Badge>
                </TableCell>
                <TableCell className="TableCell text-gray-400">{user.businessId}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}