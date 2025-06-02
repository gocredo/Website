"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { Button } from "../../../../components/ui/button";
import { Plus, Download } from "lucide-react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskColumn } from "../../../../components/admin/task/task-column";
import {TaskModal} from "../../../../components/admin/task/task-modal";
import {TaskFilters} from "../../../../components/admin/task/task-filter";
import {NotificationPanel} from "../../../../components/admin/task/notification-panel";


// Types
interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
}

interface Assignee {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Assignee;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  tags: string[];
  tenantId: string;
  subtasks: { id: string; title: string; completed: boolean }[];
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

type TaskColumn = "todo" | "inProgress" | "done";
type TasksState = Record<TaskColumn, Task[]>;

export default function Tasks() {
  const [tasks, setTasks] = useState<TasksState>({
    todo: [
      {
        id: "1",
        title: "Update TechCorp Website",
        description: "<p>Add new banner</p>",
        assignee: { id: "u1", name: "Vishal" },
        priority: "HIGH",
        dueDate: "2024-06-10",
        tags: ["website", "urgent"],
        tenantId: "t2",
        subtasks: [],
      },
      {
        id: "2",
        title: "Fix StyleBoutique Bug",
        description: "<p>Checkout issue</p>",
        assignee: { id: "u2", name: "Akshansh" },
        priority: "MEDIUM",
        dueDate: "2024-06-12",
        tags: ["bug"],
        tenantId: "t2",
        subtasks: [],
      },
    ],
    inProgress: [
      {
        id: "3",
        title: "SEO for TechCorp",
        description: "<p>Optimize pages</p>",
        assignee: { id: "u3", name: "Gaurav" },
        priority: "LOW",
        dueDate: "2024-06-15",
        tags: ["seo"],
        tenantId: "t2",
        subtasks: [],
      },
    ],
    done: [
      {
        id: "4",
        title: "Blog Post for StyleBoutique",
        description: "<p>Published</p>",
        assignee: { id: "u4", name: "Alok" },
        priority: "LOW",
        tags: ["content"],
        tenantId: "t2",
        subtasks: [],
      },
    ],
  });

  const [tenantFilter, setTenantFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [tagFilter, setTagFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const tenants: Tenant[] = [
    { id: "t1", name: "GoCredo", dbUrl: "postgresql://user:pass@localhost:5432/gocredo" },
    { id: "t2", name: "TechCorp", dbUrl: "postgresql://user:pass@localhost:5432/techcorp" },
  ];

  const assignees: Assignee[] = [
    { id: "u1", name: "Vishal" },
    { id: "u2", name: "Akshansh" },
    { id: "u3", name: "Gaurav" },
    { id: "u4", name: "Alok" },
  ];

  // Filtering
  const filteredTasks = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return Object.entries(tasks).reduce((acc, [column, columnTasks]) => {
      const filtered = columnTasks.filter(
        (task) =>
          (tenantFilter === "all" || task.tenantId === tenantFilter) &&
          (assigneeFilter === "all" || task.assignee.id === assigneeFilter) &&
          (priorityFilter === "all" || task.priority === priorityFilter) &&
          (tagFilter === "" || task.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))) &&
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!startDate || (task.dueDate && new Date(task.dueDate) >= startDate)) &&
          (!endDate || (task.dueDate && new Date(task.dueDate) <= endDate))
      );
      return { ...acc, [column]: filtered };
    }, {} as TasksState);
  }, [tasks, tenantFilter, assigneeFilter, priorityFilter, dateRange, tagFilter, searchTerm]);

  // Drag-and-Drop
  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    const sourceColumn = Object.keys(tasks).find((key) =>
      tasks[key as TaskColumn].some((task) => task.id === active.id)
    ) as TaskColumn | undefined;
    const destinationColumn = Object.keys(tasks).find((key) =>
      tasks[key as TaskColumn].some((task) => task.id === over.id)
    ) as TaskColumn | undefined;

    if (sourceColumn && destinationColumn) {
      setTasks((prev) => {
        let sourceTasks = [...prev[sourceColumn]];
        let destTasks = [...prev[destinationColumn]];
        const movedTask = sourceTasks.find((task) => task.id === active.id);

        sourceTasks = sourceTasks.filter((task) => task.id !== active.id);
        if (movedTask) {
          destTasks = sourceColumn === destinationColumn
            ? [...destTasks.filter((t) => t.id !== movedTask.id), movedTask]
            : [...destTasks, movedTask];
        }

        setNotifications((prev) => [
          ...prev,
          {
            id: `notif-${Date.now()}`,
            message: `Task "${movedTask?.title}" moved to ${destinationColumn}`,
            timestamp: new Date().toISOString(),
            read: false,
          },
        ]);

        toast.success(`Task "${movedTask?.title}" moved to ${destinationColumn}`);

        return {
          ...prev,
          [sourceColumn]: sourceTasks,
          [destinationColumn]: destTasks,
        };
      });
    }
  }, [tasks]);

  // Task Actions
  const handleSaveTask = useCallback((taskData: Partial<Task>) => {
    const newTask: Task = {
      id: taskData.id || `task-${Date.now()}`,
      title: taskData.title || "",
      description: taskData.description || "",
      assignee: taskData.assignee || assignees[0],
      priority: taskData.priority || "LOW",
      dueDate: taskData.dueDate,
      tags: taskData.tags || [],
      tenantId: taskData.tenantId || tenants[0].id,
      subtasks: taskData.subtasks || [],
    };

    setTasks((prev) => {
      const updatedTasks = Object.values(prev).flatMap((tasks) =>
        tasks.map((t) => (t.id === taskData.id ? newTask : t))
      );
    
      const newState: TasksState = {
        todo: updatedTasks.filter((task) => task.id === newTask.id || tasks.todo.some((t) => t.id === task.id)),
        inProgress: updatedTasks.filter((task) => tasks.inProgress.some((t) => t.id === task.id)),
        done: updatedTasks.filter((task) => tasks.done.some((t) => t.id === task.id)),
      };
    
      if (!taskData.id) {
        newState.todo.push(newTask);
      }
    
      return newState;
    });

    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        message: `Task "${newTask.title}" ${taskData.id ? "updated" : "created"}`,
        timestamp: new Date().toISOString(),
        read: false,
      },
    ]);

    toast.success(`Task "${newTask.title}" ${taskData.id ? "updated" : "created"}`);
  }, [assignees, tenants]);

  const handleExport = useCallback(() => {
    const csvData = Object.values(filteredTasks).flat().map((task) => ({
      Title: task.title,
      Tenant: tenants.find((t) => t.id === task.tenantId)?.name,
      Assignee: task.assignee.name,
      Priority: task.priority,
      DueDate: task.dueDate || "N/A",
      Tags: task.tags.join(", "),
      Status: Object.keys(filteredTasks).find((key) =>
        filteredTasks[key as TaskColumn].some((t) => t.id === task.id)
      ),
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tasks.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [filteredTasks, tenants]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  // Notification for Due Dates
  useEffect(() => {
    const now = new Date();
    Object.values(tasks).flat().forEach((task) => {
      if (task.dueDate && new Date(task.dueDate) <= now && !notifications.some((n) => n.message.includes(`Due date for "${task.title}"`))) {
        setNotifications((prev) => [
          ...prev,
          {
            id: `notif-${Date.now()}`,
            message: `Due date for "${task.title}" has passed`,
            timestamp: new Date().toISOString(),
            read: false,
          },
        ]);
        toast.warning(`Due date for "${task.title}" has passed`);
      }
    });
  }, [tasks, notifications]);

  return (
    <div className="space-y-6 p-6 bg-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold text-white md:text-3xl"
      >
        GoCredo Task Management
      </motion.h1>

      <div className="flex justify-between items-center">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
        <Button
          variant="outline"
          className="border-gray-700 bg-gray-900 text-white"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <TaskFilters
        tenantFilter={tenantFilter}
        setTenantFilter={setTenantFilter}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        tenants={tenants}
        assignees={assignees}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(filteredTasks).map(([column, columnTasks]) => (
            <TaskColumn
              key={column}
              columnId={column}
              title={column.replace(/([A-Z])/g, " $1").trim()}
              tasks={columnTasks as Task[]}
              onViewDetails={(task) => {
                setSelectedTask({ ...task, subtasks: task.subtasks || [] });
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </DndContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleSaveTask}
        tenants={tenants}
        assignees={assignees}
      />

      <NotificationPanel notifications={notifications} markAsRead={markNotificationAsRead} />
    </div>
  );
}