import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUBJECTS = [
  { name: "Physics", slug: "physics", icon: "⚛️", color: "#3b82f6", chapters: 13, videos: "50+", desc: "Mechanics, Thermodynamics, Electromagnetism, Optics & Modern Physics" },
  { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "#10b981", chapters: 10, videos: "40+", desc: "Organic, Inorganic & Physical Chemistry with expert guidance" },
  { name: "Mathematics", slug: "mathematics", icon: "📐", color: "#f59e0b", chapters: 11, videos: "45+", desc: "Algebra, Calculus, Geometry, Statistics & Probability" },
  { name: "Biology", slug: "biology", icon: "🧬", color: "#ec4899", chapters: 10, videos: "35+", desc: "Cell Biology, Genetics, Ecology & Human Physiology" },
  { name: "Robotics", slug: "robotics", icon: "🤖", color: "#8b5cf6", chapters: 7, videos: "25+", desc: "Programming, Electronics, AI & Mechanical Design" },
  { name: "Olympiad", slug: "olympiad", icon: "🏆", color: "#ef4444", chapters: 8, videos: "30+", desc: "National & International Olympiad coaching for top performers" },
];

const STATS = [
  { number: "5000+", label: "Students Enrolled", icon: "👨‍🎓" },
  { number: "200+", label: "Video Lectures", icon: "🎥" },
  { number: "6", label: "Subjects", icon: "📚" },
  { number: "98%", label: "Success Rate", icon: "🏆" },
];

const FEATURES = [
  { icon: "🎓", title: "Expert Faculty", desc: "Learn from experienced teachers with proven track records in JEE, NEET & Olympiads" },
  { icon: "📱", title: "Study Anywhere", desc: "Access all lectures and content from any device, anytime you want" },
  { icon: "🔄", title: "Lifetime Access", desc: "Once enrolled, access your course content forever — no expiry" },
  { icon: "💡", title: "Concept Clarity", desc: "Deep conceptual understanding with problem-solving techniques" },
  { icon: "📊", title: "Track Progress", desc: "Monitor your learning with detailed progress tracking and analytics" },
  { icon: "🏆", title: "Result Oriented", desc: "Structured curriculum designed for maximum exam performance" },
];

const TESTIMONIALS = [
  { name: "Arjun Patil", score: "JEE Advanced AIR 847", text: "Yuvi Gurukul's Physics lectures are exceptional. The clarity of concepts helped me crack JEE Advanced!", avatar: "A" },
  { name: "Priya Sharma", score: "NEET Score: 720/720", text: "The Biology and Chemistry content is absolutely top-notch. I couldn't have achieved this without Yuvi Gurukul!", avatar: "P" },
  { name: "Rohan Desai", score: "MHT-CET: 99.8%ile", text: "The robotics course helped me think analytically. Highly recommend this platform to every student!", avatar: "R" },
];

export default function HomePage() {
  return (
    <main style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "68px",
        }}
        className="grid-bg"
      >
        {/* Background glows */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(26,35,126,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ width: "100%", padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            {/* Left */}
            <div className="animate-slide-up">
              <div className="badge badge-orange" style={{ marginBottom: "20px" }}>
                🚀 #1 Study Platform in Kolhapur
              </div>

              <h1
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(36px, 5vw, 64px)",
                  lineHeight: 1.1,
                  color: "#f1f5f9",
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
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  marginBottom: "36px",
                  maxWidth: "500px",
                }}
              >
                Yuvi Gurukul offers world-class video lectures for JEE, NEET, MHT-CET & Olympiad
                preparation. Expert teaching. Proven results. Lifetime access.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
                <Link href="/register" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
                  Start Learning Free 🚀
                </Link>
                <a href="https://www.youtube.com/@physicsedupoint" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "16px", padding: "14px 32px" }}>
                  ▶ Watch on YouTube
                </a>
              </div>

              {/* Mini stats */}
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "28px", color: "#FF6B00" }}>
                      {s.number}
                    </div>
                    <div style={{ fontSize: "13px", color: "#64748b" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero visual */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                className="animate-float"
                style={{
                  width: "380px",
                  height: "380px",
                  position: "relative",
                }}
              >
                {/* Outer ring */}
                <div
                  className="animate-spin-slow"
                  style={{
                    position: "absolute",
                    inset: "0",
                    border: "2px dashed rgba(255,107,0,0.2)",
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
                    width: "260px",
                    background: "linear-gradient(135deg, #111827, #1a2236)",
                    border: "1px solid rgba(255,107,0,0.3)",
                    borderRadius: "20px",
                    padding: "28px",
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "12px" }}>⚡</div>
                  <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "22px", color: "#f1f5f9", marginBottom: "6px" }}>
                    Yuvi Gurukul
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>Physics Edupoint, Kolhapur</div>
                  <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
                    {["JEE", "NEET", "MHT-CET"].map((t) => (
                      <span key={t} className="badge badge-orange" style={{ fontSize: "11px" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Floating badges */}
                {[
                  { emoji: "⚛️", label: "Physics", top: "8%", left: "-5%" },
                  { emoji: "🧪", label: "Chemistry", top: "8%", right: "-5%" },
                  { emoji: "📐", label: "Math", bottom: "15%", left: "-8%" },
                  { emoji: "🤖", label: "Robotics", bottom: "15%", right: "-8%" },
                ].map((b) => (
                  <div
                    key={b.label}
                    style={{
                      position: "absolute",
                      top: b.top,
                      bottom: b.bottom,
                      left: b.left,
                      right: b.right,
                      background: "#111827",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{b.emoji}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#94a3b8" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{ background: "linear-gradient(135deg, #FF6B00, #e55a00)", padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "32px", color: "white" }}>{s.number}</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUBJECTS SECTION ===== */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "16px" }}>📚 Our Subjects</div>
            <h2 className="section-title">
              Master Every <span className="text-gradient">Subject</span>
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Expert-crafted courses for JEE, NEET, MHT-CET & Olympiad preparation
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {SUBJECTS.map((sub) => (
              <Link
                key={sub.slug}
                href={`/subjects/${sub.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card" style={{ height: "100%", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        background: `${sub.color}20`,
                        border: `1px solid ${sub.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                      }}
                    >
                      {sub.icon}
                    </div>
                    <span className="badge" style={{ background: `${sub.color}15`, color: sub.color, border: `1px solid ${sub.color}30`, fontSize: "11px" }}>
                      {sub.videos} videos
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "20px", color: "#f1f5f9", marginBottom: "8px" }}>
                    {sub.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6, marginBottom: "20px" }}>
                    {sub.desc}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "#475569" }}>
                      📖 {sub.chapters} chapters
                    </span>
                    <span style={{ fontSize: "13px", color: sub.color, fontWeight: 600 }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/subjects" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
              View All Subjects 📚
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ padding: "100px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-blue" style={{ marginBottom: "16px" }}>✨ Why Yuvi Gurukul</div>
            <h2 className="section-title">
              Why Students <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We combine expert teaching with modern technology to deliver the best learning experience
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="card" style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "rgba(255,107,0,0.1)",
                    border: "1px solid rgba(255,107,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    margin: "0 auto 16px",
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "17px", color: "#f1f5f9", marginBottom: "8px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== YOUTUBE SECTION ===== */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <div className="badge badge-orange" style={{ marginBottom: "16px" }}>▶ YouTube Channel</div>
              <h2 className="section-title">
                Watch Free <span className="text-gradient">Lectures</span> on YouTube
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
                Subscribe to <strong style={{ color: "#FF6B00" }}>Physics Edupoint</strong> on YouTube for free lectures,
                concept explanations, and exam tips. Hundreds of videos available for free!
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a
                  href="https://www.youtube.com/@physicsedupoint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  ▶ Subscribe on YouTube
                </a>
                <Link href="/subjects" className="btn-secondary">
                  Browse All Content
                </Link>
              </div>
            </div>
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,107,0,0.2)",
              }}
            >
              <iframe
                width="100%"
                height="280"
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

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: "100px 0", background: "#060a14" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="badge badge-orange" style={{ marginBottom: "16px" }}>⭐ Student Stories</div>
            <h2 className="section-title">
              What Our <span className="text-gradient">Students Say</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card">
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#FF6B00", fontSize: "16px" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.8, marginBottom: "20px", fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF6B00, #FF8C40)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "15px" }}>{t.name}</div>
                    <div style={{ fontSize: "12px", color: "#FF6B00", fontWeight: 600 }}>{t.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1a237e, #0d1757)",
              border: "1px solid rgba(255,107,0,0.2)",
              borderRadius: "24px",
              padding: "80px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-50px", left: "-50px", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🚀</div>
              <h2 className="section-title" style={{ color: "#f1f5f9", marginBottom: "16px" }}>
                Ready to Start Your <span className="text-gradient">Success Journey?</span>
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "17px", maxWidth: "500px", margin: "0 auto 40px" }}>
                Join thousands of students already learning with Yuvi Gurukul. Registration is completely free!
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/register" className="btn-primary" style={{ fontSize: "16px", padding: "14px 36px" }}>
                  Join For Free 🎓
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ fontSize: "16px", padding: "14px 36px", borderColor: "rgba(255,255,255,0.2)" }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
      `}</style>
    </main>
  );
}
