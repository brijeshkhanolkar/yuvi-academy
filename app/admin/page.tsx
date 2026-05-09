import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const [users, subjects, videos, chapters, announcements] = await Promise.all([
    prisma.user.count({ where: { role: "student" } }),
    prisma.subject.count(),
    prisma.video.count(),
    prisma.chapter.count(),
    prisma.announcement.count({ where: { isActive: true } }),
  ]);

  const recentStudents = await prisma.user.findMany({
    where: { role: "student" },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, createdAt: true, isActive: true, image: true },
  });

  const recentVideos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { chapter: { include: { subject: true } } },
  });

  const STATS = [
    { icon: "👥", label: "Total Students", value: users, color: "#3b82f6", href: "/admin/students" },
    { icon: "📚", label: "Subjects", value: subjects, color: "#10b981", href: "/admin/subjects" },
    { icon: "🎥", label: "Videos", value: videos, color: "#FF6B00", href: "/admin/videos" },
    { icon: "📖", label: "Chapters", value: chapters, color: "#8b5cf6", href: "/admin/videos" },
    { icon: "📢", label: "Announcements", value: announcements, color: "#f59e0b", href: "/admin/announcements" },
  ];

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "28px", color: "#f1f5f9", marginBottom: "4px" }}>
          Admin Dashboard 📊
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Welcome back! Here's an overview of Yuvi Gurukul platform.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {STATS.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#111827",
                border: `1px solid ${s.color}25`,
                borderRadius: "16px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              className="stat-card"
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{s.icon}</div>
              <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "32px", color: s.color, marginBottom: "4px" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Recent Students */}
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "15px", color: "#f1f5f9" }}>👥 Recent Students</h2>
            <Link href="/admin/students" style={{ fontSize: "12px", color: "#FF6B00", textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ padding: "12px" }}>
            {recentStudents.map((s) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 8px", borderRadius: "8px", marginBottom: "4px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: s.image ? `url(${s.image})` : "linear-gradient(135deg, #FF6B00, #FF8C40)",
                  backgroundSize: "cover", backgroundPosition: "center",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 700, fontFamily: "Poppins", fontSize: "14px", flexShrink: 0
                }}>
                  {!s.image && (s.name?.[0] || "S")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "13px" }}>{s.name || "Unnamed"}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.email}</div>
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: 700,
                  color: s.isActive ? "#4ade80" : "#f87171",
                  background: s.isActive ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                  padding: "2px 8px", borderRadius: "100px",
                }}>
                  {s.isActive ? "Active" : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Videos */}
        <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "15px", color: "#f1f5f9" }}>🎥 Recent Videos</h2>
            <Link href="/admin/videos" style={{ fontSize: "12px", color: "#FF6B00", textDecoration: "none", fontWeight: 600 }}>Manage →</Link>
          </div>
          <div style={{ padding: "12px" }}>
            {recentVideos.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", color: "#475569", fontSize: "14px" }}>
                No videos yet. <Link href="/admin/videos" style={{ color: "#FF6B00", textDecoration: "none" }}>Add videos →</Link>
              </div>
            ) : (
              recentVideos.map((v) => (
                <div key={v.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "8px", marginBottom: "4px" }}>
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                    alt={v.title}
                    style={{ width: "60px", height: "36px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, color: "#f1f5f9", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.title}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{v.chapter.subject.name} • {v.chapter.title}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: "24px", background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", padding: "20px" }}>
        <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "15px", color: "#f1f5f9", marginBottom: "16px" }}>⚡ Quick Actions</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/admin/videos" className="btn-primary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            ➕ Add New Video
          </Link>
          <Link href="/admin/subjects" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            📚 Manage Subjects
          </Link>
          <Link href="/admin/announcements" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            📢 New Announcement
          </Link>
          <Link href="/admin/students" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 18px" }}>
            👥 View Students
          </Link>
        </div>
      </div>

      <style>{`
        .stat-card:hover { border-color: rgba(255,107,0,0.3) !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
