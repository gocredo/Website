
import { Pie } from "react-chartjs-2";
import { Card } from "../../../components/ui/card";
import { User } from "./type";

interface UserChartProps {
  users: User[];
}

export function UserChart({ users }: UserChartProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <div className="p-4">
        <h3 className="text-white">Role Distribution</h3>
        <Pie
          data={{
            labels: ["Admin", "Owner", "Staff"],
            datasets: [
              {
                data: [
                  users.filter((u) => u.role === "ADMIN").length,
                  users.filter((u) => u.role === "OWNER").length,
                  users.filter((u) => u.role === "STAFF").length,
                ],
                backgroundColor: ["#A855F7", "#3B82F6", "#10B981"],
                borderColor: "#FFFFFF",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
          }}
        />
      </div>
    </Card>
  );
}
