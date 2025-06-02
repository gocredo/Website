import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { TaskCard } from "./task-card";
import { Task } from "./type";

interface TaskColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onViewDetails: (task: Task) => void;
}

export function TaskColumn({ columnId, title, tasks, onViewDetails }: TaskColumnProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white capitalize">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}  />
          ))}
        </SortableContext>
      </CardContent>
    </Card>
  );
}