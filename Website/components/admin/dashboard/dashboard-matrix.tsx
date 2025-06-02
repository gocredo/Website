import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Users, DollarSign, Globe, Mail, FileText } from "lucide-react";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardMetricsProps {
  metrics: Metric[];
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === "up" ? "TrendingUp" : "TrendingDown";
        return (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}