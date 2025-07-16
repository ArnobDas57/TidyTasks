export type TaskCompletionStatus =
  | "To Do"
  | "In Progress"
  | "In Review"
  | "Done";

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export interface Task {
  task_id: string;
  title: string;
  description: string | null;
  completion_status: TaskCompletionStatus;
  due_date: string | null;
  created_at?: string | null;
  priority: TaskPriority;
  user_id: string;
}
