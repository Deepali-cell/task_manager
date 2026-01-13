"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import { User, Task, AuthContextType } from "@/types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTaskList = async () => {
    try {
      const { data } = await axios.get(`/api/taskList`);
      if (data.success) setTasks(data.tasks);
      else toast(data.message);
    } catch (error) {
      console.error("Error fetching task list", error);
      toast("Error fetching task list");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, tasks, setTasks, fetchTaskList }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
