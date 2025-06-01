
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const logs = [
    { id: "1", action: "Business Created", userId: "1", businessId: "1", timestamp: "2024-06-01 10:00" },
    { id: "2", action: "User Updated", userId: "2", businessId: "2", timestamp: "2024-06-02 12:00" },
  ];

  const filteredLogs = logs.filter((log) => log.action.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Audit Logs
      </motion.h1>
      <Input
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-gray-900 border-gray-700 text-white"
      />
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Action</TableHead>
              <TableHead className="text-gray-300">User ID</TableHead>
              <TableHead className="text-gray-300">Business ID</TableHead>
              <TableHead className="text-gray-300">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-white">{log.action}</TableCell>
                <TableCell className="text-gray-400">{log.userId}</TableCell>
                <TableCell className="text-gray-400">{log.businessId}</TableCell>
                <TableCell className="text-gray-400">{log.timestamp}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
