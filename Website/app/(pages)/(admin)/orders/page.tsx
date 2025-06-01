
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Badge } from  "../../../../components/ui/badge";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const orders = [
    { id: "1", type: "PRODUCT", total: "₹1000", businessId: "1", status: "PAID", createdAt: "2024-06-01" },
    { id: "2", type: "MENU_ITEM", total: "₹500", businessId: "2", status: "PENDING", createdAt: "2024-06-02" },
  ];

  const filteredOrders = orders.filter((o) => o.id.includes(searchTerm.toString()));

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl">
        Orders
      </motion.h1>
      <Input
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-gray-900 border-gray-700 text-white"
      />
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Order ID</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Total</TableHead>
              <TableHead className="text-gray-300">Business ID</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-white">{order.id}</TableCell>
                <TableCell className="text-gray-400">{order.type}</TableCell>
                <TableCell className="text-white">{order.total}</TableCell>
                <TableCell className="text-gray-400">{order.businessId}</TableCell>
                <TableCell>
                  <Badge className={order.status === "PAID" ? "bg-green-500" : "bg-yellow-500"}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-400">{order.createdAt}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
