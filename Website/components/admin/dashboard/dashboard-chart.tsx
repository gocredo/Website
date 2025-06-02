import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

interface DashboardChartsProps {
  websiteStatusData: { labels: string[]; data: number[] };
  auditTrendData: { labels: string[]; data: number[] };
  emailReportTypeData: { labels: string[]; data: number[] };
}

export function DashboardCharts({ websiteStatusData, auditTrendData, emailReportTypeData }: DashboardChartsProps) {
  const chartOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: "white" } } },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "white" } },
      x: { grid: { display: false }, ticks: { color: "white" } },
    },
  };

  const pieChartData = {
    labels: websiteStatusData.labels,
    datasets: [{ data: websiteStatusData.data, backgroundColor: ["#10B981", "#FBBF24", "#EF4444"] }],
  };

  const lineChartData = {
    labels: auditTrendData.labels,
    datasets: [
      {
        label: "Audit Logs",
        data: auditTrendData.data,
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: emailReportTypeData.labels,
    datasets: [
      {
        label: "Email Reports",
        data: emailReportTypeData.data,
        backgroundColor: "rgba(236, 72, 153, 0.8)",
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Website Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { labels: { color: "white" } } } }} />
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Audit Log Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={lineChartData} options={chartOptions} />
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Email Report Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={barChartData} options={chartOptions} />
        </CardContent>
      </Card>
    </div>
  );
}