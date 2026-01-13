"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { User, Task, AuthContextType } from "@/types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/profile");
        setUser(data.user ?? null);
      } catch (error) {
        console.error("Error fetching user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const fetchTaskList = async () => {
    try {
      const { data } = await axios.get("/api/taskList");
      if (data.success) setTasks(data.tasks);
      else console.log("task list is empty may be");
    } catch (error) {
      console.error("Error fetching task list", error);
      toast("Error fetching task list");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        fetchTaskList,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
