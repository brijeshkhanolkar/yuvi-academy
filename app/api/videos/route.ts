import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chapterId = searchParams.get("chapterId");
  const subjectSlug = searchParams.get("subjectSlug");
  const featured = searchParams.get("featured");

  if (chapterId) {
    const videos = await prisma.video.findMany({
      where: { chapterId },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(videos);
  }

  if (subjectSlug) {
    const videos = await prisma.video.findMany({
      where: { chapter: { subject: { slug: subjectSlug } } },
      include: { chapter: { include: { subject: true } } },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(videos);
  }

  if (featured === "true") {
    const videos = await prisma.video.findMany({
      where: { isFeatured: true },
      include: { chapter: { include: { subject: true } } },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(videos);
  }

  const videos = await prisma.video.findMany({
    include: { chapter: { include: { subject: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();

  // Extract YouTube ID from URL if full URL provided
  let youtubeId = data.youtubeId;
  if (youtubeId.includes("youtube.com") || youtubeId.includes("youtu.be")) {
    const match =
      youtubeId.match(/[?&]v=([^&]+)/) ||
      youtubeId.match(/youtu\.be\/([^?]+)/);
    if (match) youtubeId = match[1];
  }

  const video = await prisma.video.create({
    data: { ...data, youtubeId },
  });
  return NextResponse.json(video);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...data } = await req.json();
  const video = await prisma.video.update({ where: { id }, data });
  return NextResponse.json(video);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.video.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
