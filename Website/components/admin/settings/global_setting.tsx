"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
interface GlobalSettingsProps {
  emailTemplate: string;
  apiKey: string;
  setState: (state: any) => void;
  handleSaveGlobalSettings: () => void;
}

export function GlobalSettings({ emailTemplate, apiKey, setState, handleSaveGlobalSettings }: GlobalSettingsProps) {
  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-white">Global Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-200">Email Template</label>
            <Input
              placeholder="Enter email template"
              value={emailTemplate}
              onChange={(e) => setState((prev: any) => ({ ...prev, emailTemplate: e.target.value }))}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-200">API Key</label>
            <Input
              placeholder="Enter API key"
              value={apiKey}
              onChange={(e) => setState((prev: any) => ({ ...prev, apiKey: e.target.value }))}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <Button
            onClick={handleSaveGlobalSettings}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium w-full sm:w-auto"
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}