import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function getUserFromCookie() {
  "use server";

  const cookieStore = cookies();

  const tokenCookie = (await cookieStore).get("taskmanager_usertoken");

  if (!tokenCookie) return null;

  const token = tokenCookie.value;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return { user, token };
  } catch (err) {
    console.log(err);
    return null;
  }
}
