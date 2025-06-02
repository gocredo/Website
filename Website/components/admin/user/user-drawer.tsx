
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "../../../components/ui/drawer";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";
import { User, UserRole } from "./type";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface UserDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDrawer({ user, isOpen, onClose }: UserDrawerProps) {
  if (!user) return null;

  const performanceChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [10, 15, 20, 25, 30, user.tasksCompleted],
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: "white" } } },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } },
      x: { grid: { display: false }, ticks: { color: "white" } },
    },
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-gray-900 border-gray-800 text-white">
        <DrawerHeader>
          <DrawerTitle>{user.name}'s Profile</DrawerTitle>
          <DrawerDescription>View and manage user details</DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="profile" className="p-4">
          <TabsList className="bg-gray-950 border-gray-800">
            {["profile", "activity", "notifications", "analytics"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <div>
              <label className="text-gray-300">Name</label>
              <Input value={user.name} className="bg-gray-800 border-gray-700 text-white" disabled />
            </div>
            <div>
              <label className="text-gray-300">Email</label>
              <Input value={user.email} className="bg-gray-800 border-gray-700 text-white" disabled />
            </div>
            <div>
              <label className="text-gray-300">Role</label>
              <Select defaultValue={user.role}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {["ADMIN", "OWNER", "STAFF"].map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-gray-300">Business</label>
              <Input value={user.businessName} className="bg-gray-800 border-gray-700 text-white" disabled />
            </div>
            <div>
              <label className="text-gray-300">Status</label>
              <Input value={user.status} className="bg-gray-800 border-gray-700 text-white" disabled />
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-4">
            <ul className="space-y-2">
              {user.activity.map((act) => (
                <li key={act.id} className="text-gray-300">
                  <span className="font-semibold">{act.action}</span> at {act.timestamp}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <ul className="space-y-2">
              {user.notifications.length > 0 ? (
                user.notifications.map((notif) => (
                  <li key={notif.id} className="text-gray-300">
                    <span className="font-semibold">{notif.message}</span> at {notif.timestamp}
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No notifications</p>
              )}
            </ul>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div>
              <p className="text-gray-300">Tasks Completed: {user.tasksCompleted}</p>
              <p className="text-gray-300">Revenue Generated: ₹{user.revenueGenerated.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Performance Trend</h3>
              <Line data={performanceChart} options={chartOptions} />
            </div>
          </TabsContent>
        </Tabs>
        <DrawerFooter>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500"
            onClick={() => alert("Save functionality to be implemented")}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 bg-gray-900 text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
