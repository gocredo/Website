
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const appointments = [
    { id: "1", customerName: "John Doe", service: "", email: "gocredo.team@gmail.com", businessId: "1", dateTime: "2024-06-01 10:00", status: "CONFIRMED" },
    { id: "2", customerName: "Jane Smith", service: "Haircut", businessId: "1", dateTime: "2024-06-02 11:00", status: "PENDING" },
  ];

  const filteredAppointments = appointments.filter((a) =>
    a.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl">
        Appointments
      </motion.h1>
      <Input
        placeholder="Search appointments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-gray-900 border-gray-700 text-white"
      />
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Customer</TableHead>
              <TableHead className="text-gray-300">Service</TableHead>
              <TableHead className="text-gray-300">Business ID</TableHead>
              <TableHead className="text-gray-300">DateTime</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment, index) => (
              <motion.tr
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-white">{appointment.customerName}</TableCell>
                <TableCell className="text-gray-400">{appointment.service}</TableCell>
                <TableCell className="text-gray-400">{appointment.businessId}</TableCell>
                <TableCell className="text-gray-500">{appointment.dateTime}</TableCell>
                <TableCell>
                  <Badge className={appointment.status === "CONFIRMED" ? "bg-green-500" : "bg-yellow-500"}>{appointment.status}</Badge>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
