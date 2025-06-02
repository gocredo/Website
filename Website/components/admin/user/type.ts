
export type UserRole = "ADMIN" | "OWNER" | "STAFF";
export type UserStatus = "ACTIVE" | "INACTIVE";
export type SortKey = "name" | "email" | "role" | "lastActive";
export type SortConfig = { key: SortKey; direction: "asc" | "desc" };

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessId: string;
  businessName: string;
  status: UserStatus;
  lastActive: string;
  tasksCompleted: number;
  revenueGenerated: number;
  activity: { id: string; action: string; timestamp: string }[];
  notifications: { id: string; message: string; timestamp: string }[];
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  businessId: string;
}
