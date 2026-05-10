import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const TEAM = [
  {
    name: "Ritesh Dalal Sir",
    role: "Founder & Lead Educator",
    subjects: ["Physics"],
    bio: "With years of profound teaching experience, Ritesh Dalal Sir has helped thousands of students crack JEE, NEET and MHT-CET. His unique, conceptual approach to Physics makes complex topics easy to understand and master.",
    avatar: "R",
    image: "/ritesh-dalal.jpg",
    color: "#FF6B00",
  },
];

const MILESTONES = [
  { year: "2018", title: "Foundation", desc: "Physics Edupoint started as a small coaching class in Rajarampuri, Kolhapur with just 20 students." },
  { year: "2020", title: "YouTube Launch", desc: "Launched the Physics Edupoint YouTube channel, reaching thousands of students across Maharashtra." },
  { year: "2022", title: "Digital Expansion", desc: "Expanded to full online courses covering Physics, Chemistry, Mathematics, Biology, and Robotics." },
  { year: "2023", title: "5000+ Students", desc: "Crossed the milestone of 5,000 enrolled students with a 98% exam success rate." },
  { year: "2024", title: "Yuvi Gurukul Platform", desc: "Launched the Yuvi Gurukul platform — a world-class digital study hub for competitive exam preparation." },
  { year: "2025", title: "Growing Strong", desc: "Continuing to grow with new courses, olympiad coaching, and a passionate community of learners." },
];

const VALUES = [
  { icon: "🎯", title: "Mission", color: "#FF6B00", desc: "To make world-class education accessible to every student in India, regardless of geography or economic background, through technology and passionate teaching." },
  { icon: "🔭", title: "Vision", color: "#3b82f6", desc: "To become India's most trusted ed-tech platform for competitive exam preparation, producing future scientists, engineers, and innovators from Tier-2 and Tier-3 cities." },
  { icon: "💎", title: "Values", color: "#7c3aed", desc: "Excellence, integrity, and student-first thinking. We measure our success by the success of our students — every rank, every mark, every dream fulfilled." },
];

const WHY_US = [
  { icon: "🎓", title: "Proven Results", desc: "98% of our students clear their target exams. JEE Advanced, NEET, MHT-CET — we have toppers in all." },
  { icon: "📹", title: "200+ Video Lectures", desc: "Comprehensive video library with HD quality lectures organized by chapter and difficulty level." },
  { icon: "🧑‍🏫", title: "Expert Faculty", desc: "Learn directly from experienced educators who know the exam pattern inside-out." },
  { icon: "📱", title: "Study Anywhere", desc: "Access all content from any device. Mobile-first design ensures smooth learning on the go." },
  { icon: "🔄", title: "Lifetime Access", desc: "Pay once, access forever. Your course material never expires — revise anytime before your exam." },
  { icon: "🏆", title: "Olympiad Coaching", desc: "Special modules for National and International Olympiads, designed to produce top 1% performers." },
];

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div style={{ background: "#080c18", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "70px",
          position: "relative",
          overflow: "hidden",
        }}
        className="grid-bg"
      >
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
          <div className="badge badge-orange" style={{ marginBottom: "24px" }}>🏫 Our Story</div>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#f0f4ff",
              marginBottom: "24px",
            }}
          >
            Built on a{" "}
            <span className="text-gradient">Passion</span>
            <br />
            for Teaching
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#94a3b8",
              maxWidth: "620px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            Yuvi Gurukul is more than a coaching platform. It{"'"}s a movement to democratize quality education and prove that students from any city can compete with the best in India.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/subjects" className="btn-primary" style={{ fontSize: "15px" }}>
              Explore Courses 📚
            </Link>
            <Link href="/register" className="btn-secondary" style={{ fontSize: "15px" }}>
              Join Free 🎓
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "linear-gradient(135deg, #FF6B00, #cc5500)", padding: "44px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
            {[
              { num: "5000+", label: "Students Enrolled", icon: "👨‍🎓" },
              { num: "200+", label: "Video Lectures", icon: "🎥" },
              { num: "6", label: "Subjects", icon: "📚" },
              { num: "98%", label: "Success Rate", icon: "🏆" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "30px", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: "34px", color: "white", letterSpacing: "-0.03em" }}>{s.num}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "16px" }}>🎯 What Drives Us</div>
            <h2 className="section-title">
              Our <span className="text-gradient">Core</span> Principles
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {VALUES.map((v) => (
              <div key={v.title} className="glass-card" style={{ padding: "36px 32px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "18px",
                    background: `${v.color}18`,
                    border: `1px solid ${v.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "20px",
                  }}
                >
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "20px", color: v.color, marginBottom: "12px", letterSpacing: "-0.02em" }}>
                  {v.title}
                </h3>
                <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.8 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "100px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div className="badge badge-purple" style={{ marginBottom: "20px" }}>📅 Our Journey</div>
              <h2 className="section-title" style={{ marginBottom: "20px" }}>
                From a Small Classroom<br />to{" "}
                <span className="text-gradient">Thousands</span>{" "}of Homes
              </h2>
              <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
                What started as a dream to teach Physics with clarity has grown into a full-fledged platform that serves students across Maharashtra and beyond.
              </p>
              <Link href="/register" className="btn-primary">
                Be Part of the Story 🚀
              </Link>
            </div>
            <div>
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="timeline-item" style={{ paddingBottom: i === MILESTONES.length - 1 ? "0" : "36px" }}>
                  <div className="timeline-dot" />
                  {i < MILESTONES.length - 1 && (
                    <div style={{ position: "absolute", left: "8px", top: "22px", bottom: 0, width: "2px", background: "linear-gradient(to bottom, rgba(255,107,0,0.4), rgba(255,107,0,0.05))" }} />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 800,
                        fontSize: "13px",
                        color: "#FF6B00",
                        background: "rgba(255,107,0,0.1)",
                        border: "1px solid rgba(255,107,0,0.25)",
                        padding: "2px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      {m.year}
                    </span>
                    <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: "#f0f4ff", fontSize: "16px" }}>{m.title}</h4>
                  </div>
                  <p style={{ color: "#4b5a7a", fontSize: "14px", lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .journey-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "16px" }}>👨‍🏫 Meet the Team</div>
            <h2 className="section-title">
              The <span className="text-gradient">Minds</span> Behind Yuvi Gurukul
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="glass-card"
                style={{
                  width: "380px",
                  padding: "40px 36px",
                  textAlign: "center",
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
                  <div
                    style={{
                      width: "96px",
                      height: "96px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF6B00, #FF8C40)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 900,
                      fontSize: "40px",
                      color: "white",
                      margin: "0 auto",
                      boxShadow: "0 0 40px rgba(255,107,0,0.4), 0 0 80px rgba(255,107,0,0.15)",
                      overflow: "hidden",
                    }}
                  >
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={96} height={96} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    ) : (
                      member.avatar
                    )}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "22px",
                      height: "22px",
                      background: "#22c55e",
                      borderRadius: "50%",
                      border: "3px solid #0e1423",
                    }}
                  />
                </div>
                <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "22px", color: "#f0f4ff", marginBottom: "6px", letterSpacing: "-0.02em" }}>
                  {member.name}
                </h3>
                <p style={{ color: "#FF6B00", fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
                  {member.role}
                </p>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "18px", flexWrap: "wrap" }}>
                  {member.subjects.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.8 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "100px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-blue" style={{ marginBottom: "16px" }}>✨ Why Students Love Us</div>
            <h2 className="section-title">
              Everything You Need to{" "}
              <span className="text-gradient">Succeed</span>
            </h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>
              From expert faculty to lifetime content access — we have built everything around your success.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {WHY_US.map((item) => (
              <div key={item.title} className="glass-card" style={{ padding: "28px 24px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "rgba(255,107,0,0.1)",
                    border: "1px solid rgba(255,107,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginBottom: "16px",
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "17px", color: "#f0f4ff", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#4b5a7a", fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1a0a00, #2d1200)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: "28px",
              padding: "80px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>🎓</div>
              <h2 className="section-title" style={{ color: "#f0f4ff", marginBottom: "16px" }}>
                Ready to Join the{" "}
                <span className="text-gradient">Yuvi Family?</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: "17px", maxWidth: "520px", margin: "0 auto 40px", lineHeight: 1.7 }}>
                Join 5,000+ students who are already learning, growing, and cracking their dream exams with Yuvi Gurukul. It{"'"}s completely free to start.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" className="btn-primary" style={{ fontSize: "16px", padding: "15px 36px" }}>
                  Start Learning Free 🚀
                </Link>
                <a
                  href="https://wa.me/917276018488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: "16px", padding: "15px 36px" }}
                >
                  💬 Talk to Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
