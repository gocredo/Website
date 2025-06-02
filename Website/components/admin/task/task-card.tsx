
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "../../ui/card";
import {  Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Calendar, Tag } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: { id: string; name: string };
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  tags: string[];
  tenantId: string;
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-red-500",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-white font-semibold">{task.title}</h3>
            <Badge className={priorityColor[task.priority]}>{task.priority}</Badge>
          </div>
          <p className="text-gray-400 text-sm truncate">{task.description}</p>
          <div className="flex items-center gap-2 mt-2 text-gray-500 text-xs">
            <Calendar className="h-4 w-4" />
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-gray-300">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-2">Assigned to: {task.assignee.name}</p>
          <Button
            variant="outline"
            className="mt-4 w-full border-gray-700 text-white"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
