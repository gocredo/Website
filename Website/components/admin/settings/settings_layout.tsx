"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { UserManagement } from "./user_management";
import { GlobalSettings } from "./global_setting";

interface SettingsState {
  users: any[];
  editingUserId: string | null;
  selectedRole: string;
  emailTemplate: string;
  apiKey: string;
}

interface SettingsLayoutProps {
  state: SettingsState;
  setState: (state: any) => void;
  handleRoleUpdate: (userId: string) => void;
  handleSaveGlobalSettings: () => void;
  isFetching: boolean;
}

export function SettingsLayout({ state, setState, handleRoleUpdate, handleSaveGlobalSettings, isFetching }: SettingsLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-950 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-3xl font-bold text-white tracking-tight"
      >
        Settings
      </motion.h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-gray-800/80 backdrop-blur-sm border-gray-700 rounded-lg mb-6">
          <TabsTrigger
            value="users"
            className="text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-medium rounded-md"
          >
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="global"
            className="text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-medium rounded-md"
          >
            Global Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement
            users={state.users}
            editingUserId={state.editingUserId}
            selectedRole={state.selectedRole}
            setState={setState}
            handleRoleUpdate={handleRoleUpdate}
            isFetching={isFetching}
          />
        </TabsContent>
        <TabsContent value="global">
          <GlobalSettings
            emailTemplate={state.emailTemplate}
            apiKey={state.apiKey}
            setState={setState}
            handleSaveGlobalSettings={handleSaveGlobalSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}