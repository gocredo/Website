
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card } from "../../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Plus } from "lucide-react";

export default function Websites() {
  const [searchTerm, setSearchTerm] = useState("");
  const websites = [
    { id: "1", businessId: "1", url: "techcorp.in", mediaCount: 10, blogs: 5 },
    { id: "2", businessId: "2", url: "styleboutique.in", mediaCount: 8, blogs: 10 },
  ];

  const filteredWebsites = websites.filter((w) => w.url.includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Website Management
      </motion.h1>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search websites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-900 border-gray-700 text-white">
        </Input>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Website
        </Button>
      </div>
      <Card className="content-bg-gray-900 border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Business ID</TableHead>
              <TableHead className="text-gray-300">Website URL</TableHead>
              <TableHead className="text-gray-300">Media Count</TableHead>
              <TableHead className="text-gray-300">Blog Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWebsites.map((website, index) => (
              <motion.tr
                key={website.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-gray-600 hover:bg-gray-800"
              >
                <TableCell className="text-gray-400">{website.businessId}</TableCell>
                <TableCell className="text-blue-500">{website.url}</TableCell>
                <TableCell className="text-white">{website.mediaCount}</TableCell>
                <TableCell className="text-white">{website.blogs}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}