
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Plus } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold">{task.title}</h3>
          <p className="text-gray-400 text-sm">{task.description}</p>
          <p className="text-gray-500 text-xs mt-2">Assigned to: {task.assignee}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Tasks() {
  type TaskColumn = "todo" | "inProgress" | "done";
  type TasksState = Record<TaskColumn, Task[]>;

  const [tasks, setTasks] = useState<TasksState>({
    todo: [
      { id: "1", title: "Update TechCorp Website", description: "Add new banner", assignee: "Vishal" },
      { id: "2", title: "Fix StyleBoutique Bug", description: "Checkout issue", assignee: "Akshansh" },
    ],
    inProgress: [
      { id: "3", title: "SEO for TechCorp", description: "Optimize pages", assignee: "Gaurav" },
    ],
    done: [
      { id: "4", title: "Blog Post for StyleBoutique", description: "Published", assignee: "Alok" },
    ],
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    const sourceColumn = Object.keys(tasks).find((key) =>
      tasks[key as TaskColumn].some((task) => task.id === active.id)
    ) as TaskColumn | undefined;
    const destinationColumn = Object.keys(tasks).find((key) =>
      tasks[key as TaskColumn].some((task) => task.id === over.id)
    ) as TaskColumn | undefined;

    if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
      setTasks((prev) => {
        let sourceTasks = [...prev[sourceColumn]];
        let destTasks = [...prev[destinationColumn]];
        const movedTask = sourceTasks.find((task) => task.id === active.id);

        sourceTasks = sourceTasks.filter((task) => task.id !== active.id);
        if (movedTask) destTasks.push(movedTask);

        return {
          ...prev,
          [sourceColumn]: sourceTasks,
          [destinationColumn]: destTasks,
        };
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        Task Management
      </motion.h1>
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tasks).map(([column, columnTasks]) => (
            <Card key={column} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white capitalize">{column}</CardTitle>
              </CardHeader>
              <CardContent>
                <SortableContext items={columnTasks} strategy={verticalListSortingStrategy}>
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </SortableContext>
              </CardContent>
            </Card>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
