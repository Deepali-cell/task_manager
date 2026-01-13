"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Task } from "@/types/types";

type Priority = "LOW" | "MEDIUM" | "HIGH";

interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Task;
  onUpdated?: () => void;
}

interface EditTaskForm {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  task,
  onUpdated,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskForm>({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    },
  });

  const onSubmit = async (values: EditTaskForm) => {
    try {
      const { data } = await axios.patch(`/api/editTask/${task.id}`, {
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate) : null,
      });

      if (data.success) {
        toast.success("Task updated successfully");
        onUpdated?.();
        onClose();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Edit task error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update your task details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...register("description")}
              placeholder="Task description"
            />
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority</label>
            <Select
              defaultValue={task.priority}
              onValueChange={(value) => setValue("priority", value as Priority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Due Date</label>
            <Input type="date" {...register("dueDate")} />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
