
"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Calendar } from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description: string;
  assignee: { id: string; name: string; avatar?: string; email: string };
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  tags: string[];
  tenantId: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  campaignType?: "SEO" | "PPC" | "Social Media" | "Content" | "Email";
  status: "todo" | "inProgress" | "done";
  campaignId?: string;
}

interface CalendarViewProps {
  tasks: Task[];
  onViewDetails: (task: Task) => void;
}

export default function CalendarView({ tasks, onViewDetails }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const calendarDays = useMemo(() => {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return days.map((day) => {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split("T")[0];
      return {
        day,
        tasks: tasks.filter((task) => task.dueDate === date),
      };
    });
  }, [tasks, currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={handlePrevMonth}>Previous</Button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <Button variant="ghost" onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-24"></div>
        ))}
        {calendarDays.map(({ day, tasks }) => (
          <Card key={day} className="h-24 overflow-auto">
            <CardContent className="p-2">
              <p className="font-semibold">{day}</p>
              {tasks.map((task) => (
                <Button
                  key={task.id}
                  variant="ghost"
                  className="text-left text-xs p-1 w-full truncate"
                  onClick={() => onViewDetails(task)}
                >
                  {task.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
