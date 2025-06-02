import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface Activity {
  id: string;
  type: "AUDIT" | "WEBSITE" | "EMAIL";
  description: string;
  timestamp: string;
  tenantId: string;
}

interface RecentActivityFeedProps {
  activities: Activity[];
  tenants: { id: string; name: string }[];
}

export function RecentActivityFeed({ activities, tenants }: RecentActivityFeedProps) {
  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "AUDIT": return "bg-green-500";
      case "WEBSITE": return "bg-blue-500";
      case "EMAIL": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <div className={`w-2 h-2 ${getActivityColor(activity.type)} rounded-full`}></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-white">
                {activity.description} ({tenants.find((t) => t.id === activity.tenantId)?.name})
              </p>
              <p className="text-xs text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}