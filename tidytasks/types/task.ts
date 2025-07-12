export type TaskCompletionStatus =
  | "To Do"
  | "In Progress"
  | ""
  | "In Review"
  | "Done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completion_status: TaskCompletionStatus;
  due_date: string | null;
  createdAt?: string | null;
  priority: TaskPriority;
}
