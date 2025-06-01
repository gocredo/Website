
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Download, Eye, Users, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/ui/table";

export default function Analytics() {
  const analytics = [
    { businessId: "1", name: "TechCorp", views: "10,000", visitors: "8,000", bounceRate: "30%", session: "3m 45s" },
    { businessId: "2", name: "StyleBoutique", views: "8,500", visitors: "6,500", bounceRate: "35%", session: "2m 50s" },
  ];

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Analytics
      </motion.h1>
      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Website Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Business</TableHead>
                <TableHead className="text-gray-300">Page Views</TableHead>
                <TableHead className="text-gray-300">Unique Visitors</TableHead>
                <TableHead className="text-gray-300">Bounce Rate</TableHead>
                <TableHead className="text-gray-300">Avg. Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.map((item, index) => (
                <motion.tr
                  key={item.businessId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-gray-600 hover:bg-gray-800"
                >
                  <TableCell className="text-white">{item.name}</TableCell>
                  <TableCell className="text-white">{item.views}</TableCell>
                  <TableCell className="text-white">{item.visitors}</TableCell>
                  <TableCell className="text-white">{item.bounceRate}</TableCell>
                  <TableCell className="text-white">{item.session}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Replace this section with a chart component, or display a placeholder if not implemented */}
          <div className="text-gray-400 italic">
            [Traffic Sources Pie Chart Placeholder]
          </div>
          </CardContent>
        </Card>
      </div>
    );
  }
