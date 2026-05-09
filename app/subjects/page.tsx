import { prisma } from "@/lib/db";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUBJECT_META: Record<string, { color: string; bg: string; icon: string; exam: string }> = {
  physics: { color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "⚛️", exam: "JEE • NEET • MHT-CET" },
  chemistry: { color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: "🧪", exam: "JEE • NEET • MHT-CET" },
  mathematics: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: "📐", exam: "JEE • MHT-CET • Boards" },
  biology: { color: "#ec4899", bg: "rgba(236,72,153,0.1)", icon: "🧬", exam: "NEET • MHT-CET" },
  robotics: { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", icon: "🤖", exam: "Olympiad • Projects" },
  olympiad: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "🏆", exam: "National • International" },
};

export const dynamic = "force-dynamic";


export default async function SubjectsPage() {
  const subjects = await prisma.subject.findMany({
    where: { isActive: true },
    include: { _count: { select: { chapters: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        {/* Hero */}
        <div style={{ padding: "60px 0 80px", textAlign: "center" }} className="grid-bg">
          <div className="container">
            <div className="badge badge-orange" style={{ marginBottom: "16px" }}>📚 All Subjects</div>
            <h1 className="section-title" style={{ marginBottom: "16px" }}>
              Choose Your <span className="text-gradient">Subject</span>
            </h1>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Expert-crafted video lectures for JEE, NEET, MHT-CET & Olympiad preparation
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="container" style={{ padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {subjects.map((sub) => {
              const meta = SUBJECT_META[sub.slug] || { color: "#FF6B00", bg: "rgba(255,107,0,0.1)", icon: sub.icon || "📚", exam: "All Exams" };
              return (
                <Link key={sub.id} href={`/subjects/${sub.slug}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "#111827",
                      border: `1px solid ${meta.color}20`,
                      borderRadius: "20px",
                      padding: "28px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      height: "100%",
                    }}
                    className="card"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "16px",
                          background: meta.bg,
                          border: `1px solid ${meta.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "32px",
                        }}
                      >
                        {meta.icon}
                      </div>
                      <span style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}30`, padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700 }}>
                        {meta.exam}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "22px", color: "#f1f5f9", marginBottom: "10px" }}>
                      {sub.name}
                    </h2>
                    <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
                      {sub.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "16px",
                        borderTop: `1px solid ${meta.color}15`,
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#475569" }}>
                        📖 {sub._count.chapters} chapters
                      </span>
                      <span style={{ fontSize: "13px", color: meta.color, fontWeight: 700 }}>
                        Start Learning →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="container" style={{ padding: "0 24px 80px" }}>
          <div style={{ background: "linear-gradient(135deg, #111827, #1a2236)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "28px", color: "#f1f5f9", marginBottom: "12px" }}>
              Ready to Start? <span className="text-gradient">Register Free!</span>
            </h2>
            <p style={{ color: "#64748b", marginBottom: "28px" }}>Access all video lectures, notes & more — completely free!</p>
            <Link href="/register" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
              Get Free Access 🚀
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
