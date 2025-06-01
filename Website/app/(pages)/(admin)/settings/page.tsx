
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Settings
      </motion.h1>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Global Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Email Template" className="bg-gray-900 border-gray-700 text-white" />
            <Input placeholder="API Key" className="bg-gray-900 border-gray-700 text-white" />
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
