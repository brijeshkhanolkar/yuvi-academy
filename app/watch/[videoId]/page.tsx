import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import StudentNavbar from "@/components/StudentNavbar";
export const dynamic = "force-dynamic";

export default async function WatchPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;

  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: {
      chapter: {
        include: {
          subject: true,
          videos: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!video) notFound();

  const otherVideos = video.chapter.videos.filter((v) => v.id !== video.id);
  const currentIndex = video.chapter.videos.findIndex((v) => v.id === video.id);
  const nextVideo = video.chapter.videos[currentIndex + 1];
  const prevVideo = video.chapter.videos[currentIndex - 1];

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <StudentNavbar />
      <div className="container" style={{ padding: "32px 24px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b", fontSize: "13px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ color: "#64748b", textDecoration: "none" }}>Dashboard</Link>
          <span>›</span>
          <Link href={`/subjects/${video.chapter.subject.slug}`} style={{ color: "#64748b", textDecoration: "none" }}>{video.chapter.subject.name}</Link>
          <span>›</span>
          <span style={{ color: "#FF6B00" }}>{video.title}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
          {/* Main Video */}
          <div>
            {/* YouTube Player */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,107,0,0.2)",
                marginBottom: "20px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                <h1 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "20px", color: "#f1f5f9", flex: 1 }}>
                  {video.title}
                </h1>
                {video.duration && (
                  <span style={{ fontSize: "13px", color: "#64748b", background: "#1a2236", padding: "4px 12px", borderRadius: "20px" }}>
                    ⏱ {video.duration}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>📚 {video.chapter.subject.name}</span>
                <span style={{ fontSize: "13px", color: "#64748b" }}>📖 {video.chapter.title}</span>
              </div>

              {video.description && (
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.8 }}>{video.description}</p>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", gap: "12px", marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #1e293b" }}>
                {prevVideo && (
                  <Link href={`/watch/${prevVideo.id}`} className="btn-secondary" style={{ fontSize: "13px", padding: "9px 16px" }}>
                    ← Previous
                  </Link>
                )}
                {nextVideo && (
                  <Link href={`/watch/${nextVideo.id}`} className="btn-primary" style={{ fontSize: "13px", padding: "9px 16px", marginLeft: "auto" }}>
                    Next Lecture →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar — Playlist */}
          <div>
            <div className="card" style={{ padding: "0", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e293b", background: "#1a2236" }}>
                <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "15px", color: "#f1f5f9", marginBottom: "2px" }}>
                  📖 {video.chapter.title}
                </h3>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  {video.chapter.videos.length} lectures in this chapter
                </p>
              </div>
              <div style={{ maxHeight: "500px", overflowY: "auto", padding: "12px" }}>
                {video.chapter.videos.map((v, idx) => (
                  <Link key={v.id} href={`/watch/${v.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "10px",
                        borderRadius: "8px",
                        background: v.id === video.id ? "rgba(255,107,0,0.1)" : "transparent",
                        border: v.id === video.id ? "1px solid rgba(255,107,0,0.3)" : "1px solid transparent",
                        marginBottom: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        style={{ width: "64px", height: "38px", borderRadius: "5px", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: v.id === video.id ? 700 : 500, color: v.id === video.id ? "#FF6B00" : "#94a3b8", lineHeight: 1.4 }}>
                          {idx + 1}. {v.title}
                        </div>
                        {v.duration && <div style={{ fontSize: "11px", color: "#475569", marginTop: "2px" }}>⏱ {v.duration}</div>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .watch-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
