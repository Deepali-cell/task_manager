import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "logout successfully",
    });

    // Correct way to delete cookie
    response.cookies.delete({
      name: "taskmanager_usertoken",
      path: "/", // optional, default is "/"
    });

    return response;
  } catch (error) {
    console.error("logout error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
