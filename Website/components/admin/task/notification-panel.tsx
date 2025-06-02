import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Bell } from "lucide-react";


interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

export function NotificationPanel({ notifications, markAsRead }: NotificationPanelProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 w-[300px] fixed right-4 top-20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 rounded ${notification.read ? "bg-gray-800" : "bg-gray-700"} cursor-pointer`}
              onClick={() => markAsRead(notification.id)}
            >
              <p className="text-sm text-white">{notification.message}</p>
              <p className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}