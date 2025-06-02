
export interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
}

export interface Assignee {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Assignee;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  tags: string[];
  tenantId: string;
  subtasks: { id: string; title: string; completed: boolean }[];
  campaignType?: "SEO" | "PPC" | "Social Media" | "Content" | "Email";
  status: "todo" | "inProgress" | "done";
  campaignId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: "SEO" | "PPC" | "Social Media" | "Content" | "Email";
  startDate: string;
  endDate: string;
  budget: number;
  tasks: string[];
}

export interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export type TaskColumn = "todo" | "inProgress" | "done";
export type TasksState = Record<TaskColumn, Task[]>;