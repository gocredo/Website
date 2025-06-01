"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "../../../../components/ui/dialog";
import { Plus, Filter } from "lucide-react";

export default function Businesses() {
  const [searchTerm, setSearchTerm] = useState("");
  const businesses = [
    { id: "1", name: "TechCorp", category: "RESTAURANT", websiteUrl: "techcorp.in", createdAt: "2024-01-01" },
    { id: "2", name: "StyleBoutique", category: "BOUTIQUE", websiteUrl: "styleboutique.in", createdAt: "2024-02-01" },
  ];

  const filteredBusinesses = businesses.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Businesses
      </motion.h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search businesses..."
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
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <h2 className="text-lg font-semibold">Add New Business</h2>
            <form className="space-y-4">
              <input placeholder="Name" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <input placeholder="Category" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
              <input placeholder="Website URL" className="bg-gray-800 border-gray-700 text-white w-full p-2 rounded" />
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
              <TableHead className="text-gray-300">Name</TableHead>
              <TableHead className="text-gray-300">Category</TableHead>
              <TableHead className="text-gray-300">Website URL</TableHead>
              <TableHead className="text-gray-300">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.map((business, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-white">{business.name}</TableCell>
                <TableCell className="text-gray-300">{business.category}</TableCell>
                <TableCell className="text-blue-500">{business.websiteUrl}</TableCell>
                <TableCell className="text-gray-300">{business.createdAt}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}