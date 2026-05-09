import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [users, subjects, videos, announcements] = await Promise.all([
    prisma.user.count(),
    prisma.subject.count(),
    prisma.video.count(),
    prisma.announcement.count({ where: { isActive: true } }),
  ]);

  const recentStudents = await prisma.user.findMany({
    where: { role: "student" },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, createdAt: true, isActive: true },
  });

  return NextResponse.json({ users, subjects, videos, announcements, recentStudents });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, userId, isActive } = await req.json();

  if (action === "toggleUser") {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    });
    return NextResponse.json(user);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
