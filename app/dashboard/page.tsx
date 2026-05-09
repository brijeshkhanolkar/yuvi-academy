import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import StudentNavbar from "@/components/StudentNavbar";

const SUBJECT_COLORS: Record<string, string> = {
  physics: "#3b82f6",
  chemistry: "#10b981",
  mathematics: "#f59e0b",
  biology: "#ec4899",
  robotics: "#8b5cf6",
  olympiad: "#ef4444",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    include: { _count: { select: { chapters: true } } },
    orderBy: { order: "asc" },
  });

  const announcements = await prisma.announcement.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const totalVideos = await prisma.video.count();

  const user = session.user as { name?: string; email?: string; role?: string; id?: string };

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <StudentNavbar />
      <div style={{ marginLeft: "0", paddingTop: "0" }}>
        <div className="container" style={{ padding: "32px 24px" }}>

          {/* Welcome Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a237e, #0d1757)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "150px", height: "150px", background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", color: "#f1f5f9", marginBottom: "8px" }}>
                Welcome back, <span style={{ color: "#FF6B00" }}>{user?.name?.split(" ")[0] || "Student"}</span>! 👋
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "20px" }}>
                Continue your learning journey. {totalVideos} lectures available across all subjects.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/subjects" className="btn-primary" style={{ fontSize: "14px", padding: "10px 22px" }}>
                  Browse Subjects 📚
                </Link>
                <a href="https://www.youtube.com/@physicsedupoint" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "14px", padding: "10px 22px", borderColor: "rgba(255,255,255,0.2)" }}>
                  ▶ YouTube Channel
                </a>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {[
              { icon: "📚", label: "Subjects", value: subjects.length },
              { icon: "🎥", label: "Videos", value: `${totalVideos}+` },
              { icon: "📖", label: "Chapters", value: subjects.reduce((a, s) => a + s._count.chapters, 0) },
              { icon: "🏆", label: "Exams Prep", value: "JEE/NEET" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "24px", color: "#FF6B00" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px" }}>
            {/* Subjects Grid */}
            <div>
              <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "20px", color: "#f1f5f9", marginBottom: "16px" }}>
                📚 All Subjects
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                {subjects.map((sub) => {
                  const color = SUBJECT_COLORS[sub.slug] || "#FF6B00";
                  return (
                    <Link key={sub.id} href={`/subjects/${sub.slug}`} style={{ textDecoration: "none" }}>
                      <div className="card" style={{ cursor: "pointer" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              background: `${color}20`,
                              border: `1px solid ${color}40`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "22px",
                            }}
                          >
                            {sub.icon}
                          </div>
                          <div>
                            <div style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", fontSize: "16px" }}>{sub.name}</div>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>{sub._count.chapters} chapters</div>
                          </div>
                        </div>
                        <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{sub.description}</p>
                        <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
                          <span style={{ fontSize: "12px", color, fontWeight: 600 }}>Start Learning →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Announcements */}
              {announcements.length > 0 && (
                <div className="card" style={{ marginBottom: "16px" }}>
                  <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "16px", color: "#f1f5f9", marginBottom: "16px" }}>
                    📢 Announcements
                  </h3>
                  {announcements.map((ann) => (
                    <div key={ann.id} style={{ background: "#1a2236", borderRadius: "10px", padding: "14px", marginBottom: "10px", borderLeft: "3px solid #FF6B00" }}>
                      <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px", marginBottom: "4px" }}>{ann.title}</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>{ann.content}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Links */}
              <div className="card">
                <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "16px", color: "#f1f5f9", marginBottom: "16px" }}>
                  🔗 Quick Links
                </h3>
                {[
                  { icon: "▶", label: "Physics Edupoint YouTube", href: "https://www.youtube.com/@physicsedupoint", external: true },
                  { icon: "🌐", label: "Yuvi Gurukul Website", href: "https://yuvigurukul.in", external: true },
                  { icon: "📞", label: "Contact Us on WhatsApp", href: "https://wa.me/917276018488", external: true },
                  { icon: "👤", label: "My Profile", href: "/profile", external: false },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      color: "#94a3b8",
                      textDecoration: "none",
                      fontSize: "14px",
                      marginBottom: "4px",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
