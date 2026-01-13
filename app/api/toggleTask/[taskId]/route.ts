import { getUserFromCookie } from "@/lib/getUserFromCookie";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    const data = await getUserFromCookie();
    const userId = data?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    await prisma.task.updateMany({
      where: {
        id: taskId,
        userId,
      },
      data: {
        completed: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task completed successfully",
    });
  } catch (error) {
    console.error("Complete Task error:", error);
    return NextResponse.json(
      { success: false, message: "Task not found" },
      { status: 404 }
    );
  }
}
