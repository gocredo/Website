
export interface Task {
  id: string;
  tenantId: string;
  title: string;
  description: string; // HTML content from Quill editor
  assignee: Assignee;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "todo" | "inProgress" | "done";
  dueDate?: string; // ISO date string (e.g., "2024-06-10T00:00:00Z")
  tags: string[];
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Related types
export interface Assignee {
  id: string;
  name: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  timestamp: string; // ISO date string
}

export interface Tenant {
  id: string;
  name: string;
  dbUrl: string;
}

// Audit Log interface for compliance (e.g., GST audit trails)
export interface AuditLog {
  id: string;
  tenantId: string;
  taskId?: string;
  action: string; // e.g., "TASK_CREATED", "TASK_UPDATED", "TASK_MOVED"
  userId: string;
  timestamp: string; // ISO date string
  metadata: {
    ip?: string;
    changes?: Record<string, any>;
  };
}
