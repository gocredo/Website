"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboardIcon as Dashboard,
  Users,
  Globe,
  BarChart,
  CreditCard,
  Calendar,
  ShoppingCart,
  CheckSquare,
  FileText,
  Mail,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";

export function AdminSidebar({ className = "" }) {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Dashboard, path: "/adminDashboard" },
    { id: "businesses", label: "Businesses", icon: Globe, path: "/businesses" },
    { id: "users", label: "Users", icon: Users, path: "/users" },
    { id: "analytics", label: "Analytics", icon: BarChart, path: "/analytics" },
    { id: "invoices", label: "Invoices", icon: CreditCard, path: "/invoices" },
    { id: "websites", label: "Websites", icon: Globe, path: "/websites" },
    { id: "appointments", label: "Appointments", icon: Calendar, path: "/appointments" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, path: "/tasks" },
    { id: "audit-logs", label: "Audit Logs", icon: FileText, path: "/audit-logs" },
    { id: "email-reports", label: "Email Reports", icon: Mail, path: "/email-reports" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className={`flex h-full max-h-screen flex-col gap-2 bg-gray-950 border-r border-gray-800 ${className}`}>
      <div className="flex h-14 items-center border-b border-gray-800 px-4 lg:h-[60px] lg:px-6">
        <div className="flex items-center gap-2 font-semibold text-white">
          <Dashboard className="h-6 w-6 text-purple-500" />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">goCredo Admin</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-8 w-8 border-gray-700 bg-gray-900 text-white hover:bg-gray-800"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
