
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";

export default function EmailReports() {
  const [businessId, setBusinessId] = useState("");
  const [emailContent, setEmailContent] = useState("");

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Email Reports
      </motion.h1>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Send Analytics Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setBusinessId}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select Business" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="1">value TechCorp</SelectItem>
                <SelectItem value="2">value StyleBoutique</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Send Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
