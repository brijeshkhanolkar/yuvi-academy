import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const SUBJECTS = [
  { name: "Physics", slug: "physics", icon: "⚛️", color: "#3b82f6", chapters: 13, videos: "50+", desc: "Mechanics, Thermodynamics, Electromagnetism, Optics & Modern Physics", exam: "JEE • NEET • MHT-CET" },
  { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "#10b981", chapters: 10, videos: "40+", desc: "Organic, Inorganic & Physical Chemistry with expert guidance", exam: "JEE • NEET • MHT-CET" },
  { name: "Mathematics", slug: "mathematics", icon: "📐", color: "#f59e0b", chapters: 11, videos: "45+", desc: "Algebra, Calculus, Geometry, Statistics & Probability", exam: "JEE • MHT-CET" },
  { name: "Biology", slug: "biology", icon: "🧬", color: "#ec4899", chapters: 10, videos: "35+", desc: "Cell Biology, Genetics, Ecology & Human Physiology", exam: "NEET • MHT-CET" },
  { name: "Robotics", slug: "robotics", icon: "🤖", color: "#8b5cf6", chapters: 7, videos: "25+", desc: "Programming, Electronics, AI & Mechanical Design", exam: "Olympiad • Projects" },
  { name: "Olympiad", slug: "olympiad", icon: "🏆", color: "#ef4444", chapters: 8, videos: "30+", desc: "National & International Olympiad coaching for top performers", exam: "NSO • IMO • IJSO" },
];

const STATS = [
  { number: "5000+", label: "Students Enrolled", icon: "👨‍🎓" },
  { number: "200+", label: "Video Lectures", icon: "🎥" },
  { number: "6", label: "Subjects", icon: "📚" },
  { number: "98%", label: "Success Rate", icon: "🏆" },
];

const FEATURES = [
  { icon: "🎓", title: "Expert Faculty", desc: "Learn from educators with proven track records in JEE, NEET & Olympiads. Real teachers, real results." },
  { icon: "📱", title: "Study Anywhere", desc: "Access all lectures and content from any device — mobile, tablet, or desktop — anytime, anywhere." },
  { icon: "🔄", title: "Lifetime Access", desc: "Once enrolled, access your course content forever. No subscription, no expiry. Always yours." },
  { icon: "💡", title: "Concept Clarity", desc: "Deep conceptual understanding backed by problem-solving techniques that make tough topics simple." },
  { icon: "📊", title: "Track Progress", desc: "Monitor your learning journey with detailed chapter-wise progress tracking and completion status." },
  { icon: "🏆", title: "Result Oriented", desc: "Curriculum designed for maximum exam performance. Every topic mapped to your target exam syllabus." },
];

const TESTIMONIALS = [
  { name: "Arjun Patil", score: "JEE Advanced AIR 847", text: "Yuvi Gurukul's Physics lectures are exceptional. The clarity of concepts helped me crack JEE Advanced!", avatar: "A", color: "#3b82f6" },
  { name: "Priya Sharma", score: "NEET Score: 720/720", text: "The Biology and Chemistry content is absolutely top-notch. I couldn't have achieved this without Yuvi Gurukul!", avatar: "P", color: "#ec4899" },
  { name: "Rohan Desai", score: "MHT-CET: 99.8%ile", text: "The robotics course helped me think analytically. Highly recommend this platform to every student!", avatar: "R", color: "#8b5cf6" },
];

export default function HomePage() {
  return (
    <main style={{ background: "#080c18", minHeight: "100vh" }}>
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "70px",
        }}
        className="grid-bg"
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", right: "30%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ width: "100%", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="hero-grid">

            {/* Left content */}
            <div className="animate-fade-slide-up">
              <div className="badge badge-orange" style={{ marginBottom: "24px" }}>
                🚀 #1 Study Platform in Kolhapur
              </div>

              <h1
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(38px, 5.5vw, 68px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color: "#f0f4ff",
                  marginBottom: "24px",
                }}
              >
                Learn From{" "}
                <span className="text-gradient">Experts,</span>
                <br />
                Score Like{" "}
                <span className="text-gradient">Champions</span>
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#64748b",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                  maxWidth: "480px",
                }}
              >
                Yuvi Gurukul offers world-class video lectures for JEE, NEET, MHT-CET & Olympiad preparation. Expert teaching. Proven results. Lifetime access.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" }}>
                <Link href="/register" className="btn-primary" style={{ fontSize: "16px", padding: "15px 32px" }}>
                  Start Learning Free 🚀
                </Link>
                <a href="https://www.youtube.com/@physicsedupoint" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "16px", padding: "15px 32px" }}>
                  ▶ YouTube Channel
                </a>
              </div>

              {/* Mini stats */}
              <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: "30px", color: "#FF6B00", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.number}
                    </div>
                    <div style={{ fontSize: "12px", color: "#4b5a7a", marginTop: "4px", fontWeight: 600, letterSpacing: "0.02em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="hero-visual">
              <div className="animate-float" style={{ width: "400px", height: "400px", position: "relative" }}>
                {/* Outer rotating ring */}
                <div
                  className="animate-spin-slow"
                  style={{
                    position: "absolute",
                    inset: "0",
                    border: "1px dashed rgba(255,107,0,0.25)",
                    borderRadius: "50%",
                  }}
                />
                {/* Inner ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: "30px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "50%",
                  }}
                />

                {/* Center card */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "220px",
                    background: "linear-gradient(135deg, #0e1423, #141929)",
                    border: "1px solid rgba(255,107,0,0.35)",
                    borderRadius: "24px",
                    padding: "32px 24px",
                    textAlign: "center",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,107,0,0.1)",
                  }}
                >
                  <div style={{ marginBottom: "14px", display: "flex", justifyContent: "center" }}>
                    <Image src="/logo.png" alt="Yuvi Gurukul" width={80} height={80} style={{ objectFit: "contain", height: "60px", width: "auto" }} />
                  </div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: "20px", color: "#f0f4ff", marginBottom: "6px", letterSpacing: "-0.02em" }}>
                    Yuvi Gurukul
                  </div>
                  <div style={{ fontSize: "12px", color: "#4b5a7a", marginBottom: "18px", fontWeight: 600 }}>Physics Edupoint, Kolhapur</div>
                  <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
                    {["JEE", "NEET", "MHT-CET"].map((t) => (
                      <span key={t} className="badge badge-orange" style={{ fontSize: "10px" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Floating subject badges */}
                {[
                  { emoji: "⚛️", label: "Physics", top: "6%", left: "-10%" },
                  { emoji: "🧪", label: "Chemistry", top: "6%", right: "-10%" },
                  { emoji: "📐", label: "Math", bottom: "12%", left: "-12%" },
                  { emoji: "🤖", label: "Robotics", bottom: "12%", right: "-12%" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      position: "absolute",
                      top: b.top,
                      bottom: b.bottom,
                      left: b.left,
                      right: b.right,
                      background: "rgba(14,20,35,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{b.emoji}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", fontFamily: "Space Grotesk, sans-serif" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section
        style={{
          background: "linear-gradient(135deg, #FF6B00, #cc5500)",
          padding: "50px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "url('data:image/svg+xml,...')", opacity: 0.05 }} />
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "6px" }}>{s.icon}</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 900, fontSize: "36px", color: "white", letterSpacing: "-0.04em" }}>{s.number}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 600, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUBJECTS SECTION ═══ */}
      <section style={{ padding: "110px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "18px" }}>📚 Our Subjects</div>
            <h2 className="section-title">
              Master Every <span className="text-gradient">Subject</span>
            </h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>
              Expert-crafted courses for JEE, NEET, MHT-CET & Olympiad preparation
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {SUBJECTS.map((sub) => (
              <Link key={sub.slug} href={`/subjects/${sub.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="glass-card"
                  style={{
                    padding: "28px",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                    <div
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "16px",
                        background: `${sub.color}18`,
                        border: `1px solid ${sub.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                      }}
                    >
                      {sub.icon}
                    </div>
                    <span
                      style={{
                        background: `${sub.color}15`,
                        color: sub.color,
                        border: `1px solid ${sub.color}30`,
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 700,
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      {sub.videos} videos
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "21px", color: "#f0f4ff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    {sub.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#4b5a7a", lineHeight: 1.7, marginBottom: "18px" }}>
                    {sub.desc}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#2d3a50", fontWeight: 600 }}>
                      📖 {sub.chapters} chapters
                    </span>
                    <span style={{ fontSize: "13px", color: sub.color, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "52px" }}>
            <Link href="/subjects" className="btn-primary" style={{ fontSize: "16px", padding: "15px 40px" }}>
              View All Subjects 📚
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══ */}
      <section style={{ padding: "110px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-blue" style={{ marginBottom: "18px" }}>✨ Why Yuvi Gurukul</div>
            <h2 className="section-title">
              Why Students <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>
              We combine expert teaching with modern technology to deliver the best learning experience
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: "32px 28px" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "16px",
                    background: "rgba(255,107,0,0.1)",
                    border: "1px solid rgba(255,107,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    marginBottom: "18px",
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: "#f0f4ff", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#4b5a7a", lineHeight: 1.8 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ YOUTUBE SECTION ═══ */}
      <section style={{ padding: "110px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="youtube-grid">
            <div>
              <div className="badge badge-orange" style={{ marginBottom: "18px" }}>▶ YouTube Channel</div>
              <h2 className="section-title">
                Watch Free <span className="text-gradient">Lectures</span>{" "}
                on YouTube
              </h2>
              <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px", marginTop: "16px" }}>
                Subscribe to{" "}
                <strong style={{ color: "#FF6B00" }}>Physics Edupoint</strong>{" "}
                on YouTube for free lectures, concept explanations, and exam tips. Hundreds of videos available for free!
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href="https://www.youtube.com/@physicsedupoint" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  ▶ Subscribe on YouTube
                </a>
                <Link href="/subjects" className="btn-secondary">
                  Browse All Content
                </Link>
              </div>
            </div>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.2)",
              }}
            >
              <iframe
                width="100%"
                height="300"
                src="https://www.youtube.com/embed/videoseries?list=UU3IkaqNikI4x0CPYD58ZANA"
                title="Physics Edupoint YouTube Channel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: "block", border: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "110px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "18px" }}>⭐ Student Stories</div>
            <h2 className="section-title">
              What Our <span className="text-gradient">Students Say</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card" style={{ padding: "32px 28px" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "18px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#FF6B00", fontSize: "16px" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 800,
                      color: "white",
                      fontSize: "20px",
                      flexShrink: 0,
                      boxShadow: `0 0 20px ${t.color}40`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#f0f4ff", fontSize: "15px", fontFamily: "Space Grotesk, sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 600 }}>{t.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section style={{ padding: "110px 0" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #100520, #0d1030)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: "28px",
              padding: "90px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🚀</div>
              <h2 className="section-title" style={{ color: "#f0f4ff", marginBottom: "16px" }}>
                Ready to Start Your{" "}
                <span className="text-gradient">Success Journey?</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: "18px", maxWidth: "520px", margin: "0 auto 44px", lineHeight: 1.7 }}>
                Join thousands of students already learning with Yuvi Gurukul. Registration is completely free!
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" className="btn-primary" style={{ fontSize: "17px", padding: "16px 40px" }}>
                  Join For Free 🎓
                </Link>
                <Link href="/about" className="btn-secondary" style={{ fontSize: "17px", padding: "16px 40px" }}>
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual { display: none !important; }
          .youtube-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
