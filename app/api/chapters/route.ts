import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");

  const where = subjectId ? { subjectId } : {};
  const chapters = await prisma.chapter.findMany({
    where,
    include: { _count: { select: { videos: true } }, subject: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(chapters);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const chapter = await prisma.chapter.create({ data });
  return NextResponse.json(chapter);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...data } = await req.json();
  const chapter = await prisma.chapter.update({ where: { id }, data });
  return NextResponse.json(chapter);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.chapter.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
