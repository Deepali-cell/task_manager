import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/getUserFromCookie";

interface UpdateTaskBody {
  title: string;
  description?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string | null;
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ taskId: string }> }
) {
  try {
    const { taskId } = await context.params;

    if (!taskId) {
      return NextResponse.json(
        { success: false, message: "Task ID missing" },
        { status: 400 }
      );
    }

    const userData = await getUserFromCookie();
    const userId = userData?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body: UpdateTaskBody = await req.json();
    const { title, description, priority, dueDate } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // Update the task
    const updatedTask = await prisma.task.updateMany({
      where: {
        id: taskId,
        userId,
      },
      data: {
        title,
        description: description || null,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    if (updatedTask.count === 0) {
      return NextResponse.json(
        { success: false, message: "Task not found or not yours" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Edit Task error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
