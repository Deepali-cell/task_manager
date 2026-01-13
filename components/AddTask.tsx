"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TaskForm } from "@/types/types";

const AddTask = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      priority: "MEDIUM",
    },
  });

  const onSubmit = async (data: TaskForm) => {
    const sendingData = data;
    try {
      const { data } = await axios.post("/api/addtask", sendingData);
      if (data.success) {
        router.push("/");
        toast.success("Task added successfully");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.error("frontend error while adding task:", error);
      toast.error("Something went wrong");
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Title cannot exceed 20 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Optional task description"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "Description cannot exceed 200 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
              {...register("priority", {
                required: "Priority is required",
                validate: (value) =>
                  ["LOW", "MEDIUM", "HIGH"].includes(value) ||
                  "Invalid priority selected",
              })}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black"
              {...register("dueDate", {
                validate: (value) => {
                  if (!value) return true;
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  return (
                    selectedDate >= today || "Due date cannot be in the past"
                  );
                },
              })}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
