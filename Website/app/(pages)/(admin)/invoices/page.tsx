"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Plus, Badge } from "lucide-react";

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const invoices = [
    { id: "1", businessId: "1", amount: "₹5000", status: "PAID", createdAt: "2024-06-01" },
    { id: "2", businessId: "2", amount: "₹3000", status: "PENDING", createdAt: "2024-06-02" },
  ];

  const filteredInvoices = invoices.filter((i) => i.id.includes(searchTerm));

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Invoices
      </motion.h1>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-900 border-gray-700 text-white"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <h2 className="text-lg font-semibold">Create New Invoice</h2>
            <form className="space-y-4">
              <input placeholder="Business ID" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <input placeholder="Amount (₹)" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded">
                Submit
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Invoice ID</TableHead>
              <TableHead className="text-gray-300">Business ID</TableHead>
              <TableHead className="text-gray-300">Amount</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-white">{invoice.id}</TableCell>
                <TableCell className="text-gray-400">{invoice.businessId}</TableCell>
                <TableCell className="text-white">{invoice.amount}</TableCell>
                <TableCell>
                  <Badge className={invoice.status === "PAID" ? "bg-green-500" : "bg-yellow-500"}>{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-400">{invoice.createdAt}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
