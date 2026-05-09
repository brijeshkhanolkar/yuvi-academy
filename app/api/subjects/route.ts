import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    include: { _count: { select: { chapters: true } } },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(subjects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const subject = await prisma.subject.create({ data });
  return NextResponse.json(subject);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...data } = await req.json();
  const subject = await prisma.subject.update({ where: { id }, data });
  return NextResponse.json(subject);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.subject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
