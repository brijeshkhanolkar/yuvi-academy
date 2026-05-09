import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUBJECT_META: Record<string, { color: string; bg: string }> = {
  physics: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  chemistry: { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  mathematics: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  biology: { color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
  robotics: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  olympiad: { color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          videos: { orderBy: { order: "asc" } },
          _count: { select: { videos: true } },
        },
      },
    },
  });

  if (!subject) notFound();

  const meta = SUBJECT_META[slug] || { color: "#FF6B00", bg: "rgba(255,107,0,0.1)" };
  const totalVideos = subject.chapters.reduce((a, c) => a + c._count.videos, 0);

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: "68px" }}>
        {/* Subject Hero */}
        <div
          style={{
            background: `linear-gradient(135deg, #111827, #1a2236)`,
            borderBottom: `1px solid ${meta.color}20`,
            padding: "60px 0",
          }}
        >
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <Link href="/subjects" style={{ color: "#64748b", textDecoration: "none" }}>Subjects</Link>
              <span>›</span>
              <span style={{ color: meta.color }}>{subject.name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  background: meta.bg,
                  border: `1px solid ${meta.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  flexShrink: 0,
                }}
              >
                {subject.icon}
              </div>
              <div>
                <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", color: "#f1f5f9", marginBottom: "8px" }}>
                  {subject.name}
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "20px", maxWidth: "600px" }}>
                  {subject.description}
                </p>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {[
                    { icon: "📖", label: `${subject.chapters.length} Chapters` },
                    { icon: "🎥", label: `${totalVideos} Videos` },
                    { icon: "🎓", label: "Expert Faculty" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#94a3b8" }}>
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters & Videos */}
        <div className="container" style={{ padding: "48px 24px" }}>
          {subject.chapters.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>📹</div>
              <h2 style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", marginBottom: "8px" }}>Lectures Coming Soon!</h2>
              <p style={{ color: "#64748b", marginBottom: "24px" }}>
                Videos for this subject are being added. Check back soon or subscribe to our YouTube channel!
              </p>
              <a href="https://www.youtube.com/@physicsedupoint" target="_blank" rel="noopener noreferrer" className="btn-primary">
                ▶ Watch on YouTube
              </a>
            </div>
          ) : (
            <div>
              {subject.chapters.map((chapter, idx) => (
                <div
                  key={chapter.id}
                  style={{
                    background: "#111827",
                    border: `1px solid ${meta.color}15`,
                    borderRadius: "16px",
                    marginBottom: "16px",
                    overflow: "hidden",
                  }}
                >
                  {/* Chapter Header */}
                  <div style={{ padding: "20px 24px", background: "#1a2236", borderBottom: chapter.videos.length > 0 ? `1px solid ${meta.color}15` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: meta.bg, border: `1px solid ${meta.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: meta.color, fontFamily: "Poppins" }}>
                          {idx + 1}
                        </div>
                        <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "16px", color: "#f1f5f9" }}>{chapter.title}</h3>
                      </div>
                      <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}20`, padding: "3px 10px", borderRadius: "100px", fontSize: "11px", fontWeight: 600 }}>
                        {chapter._count.videos} videos
                      </span>
                    </div>
                    {chapter.description && <p style={{ color: "#64748b", fontSize: "13px", marginTop: "6px", marginLeft: "44px" }}>{chapter.description}</p>}
                  </div>

                  {/* Videos */}
                  {chapter.videos.length > 0 ? (
                    <div style={{ padding: "16px 24px" }}>
                      {chapter.videos.map((video, vi) => (
                        <Link key={video.id} href={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                              padding: "12px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              marginBottom: "4px",
                            }}
                            className="video-row"
                          >
                            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                              ▶
                            </div>
                            <img
                              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                              alt={video.title}
                              style={{ width: "80px", height: "48px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 500, color: "#f1f5f9", fontSize: "14px", marginBottom: "2px" }}>{video.title}</div>
                              {video.duration && <div style={{ fontSize: "12px", color: "#64748b" }}>⏱ {video.duration}</div>}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: "16px 24px", color: "#475569", fontSize: "13px" }}>
                      📹 Videos for this chapter coming soon...
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style>{`
        .video-row:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>
    </div>
  );
}
