// "@/types/types.ts"

export type Priority = "LOW" | "MEDIUM" | "HIGH";

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string; // optional if coming from client
}

// Task type
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  completed?: boolean;
}

// Form input for Login
export interface LoginForm {
  name: string;
  email: string;
  password: string;
}

// Form input for Task (used in modal)
export interface TaskForm {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
}

// Context type for auth + tasks
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  fetchTaskList: () => Promise<void>;
  loading: boolean;
}
