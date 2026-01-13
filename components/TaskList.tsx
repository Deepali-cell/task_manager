"use client";

import { useAuth } from "@/context/StateContext";
import { useEffect, useState } from "react";
import { Pencil, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import EditTaskModal from "./EditTaskModal";
import { Task } from "@/types/types";

const priorityColors: Record<string, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const TaskList = () => {
  const { tasks, fetchTaskList } = useAuth();
  const [editingTask, setEditingTask] = useState<Task | null>(null); // selected task for modal

  const deleteTask = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/deletetask/${id}`);
      if (data.success) {
        fetchTaskList();
        toast("Task deleted successfully");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log("frontend error while deleting the task :", error);
      toast("frontend error while deleting the task");
    }
  };

  const toggleTaskComplete = async (id: string) => {
    try {
      const { data } = await axios.patch(`/api/toggleTask/${id}`);
      if (data.success) {
        fetchTaskList();
        toast("Task completed successfully");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log("frontend error while toggle task complete:", error);
      toast("frontend error while task completion");
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  if (!tasks || tasks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-2xl font-semibold mb-3">No Tasks Found 🚀</h2>
          <p className="text-gray-600 mb-4">
            Account banao, apne goals likho aur daily tasks complete karo.
          </p>
          <p className="text-sm text-gray-500">
            Start by adding your first task ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6">Your Tasks 📝</h1>

        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Left Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2
                  className={`text-xl font-semibold ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p className="text-gray-600 mt-2">{task.description}</p>
              )}

              <p className="text-sm text-gray-500 mt-2">
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No deadline"}
              </p>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              {!task.completed && (
                <>
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                    title="Mark Complete"
                  >
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </button>
                  {/* Edit */}
                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                    title="Edit Task"
                  >
                    <Pencil className="w-5 h-5 text-blue-700" />
                  </button>
                </>
              )}

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                title="Delete Task"
              >
                <Trash2 className="w-5 h-5 text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          open={!!editingTask}
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={fetchTaskList}
        />
      )}
    </div>
  );
};

export default TaskList;
