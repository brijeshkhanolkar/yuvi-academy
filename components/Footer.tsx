"use client";
import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@physicsedupoint", icon: "▶", color: "#ff0000" },
  { label: "WhatsApp", href: "https://wa.me/917276018488", icon: "💬", color: "#25d366" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #060a14 0%, #050810 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "70px 0 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "200px", background: "radial-gradient(ellipse, rgba(255,107,0,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "linear-gradient(135deg, #FF6B00, #FF8C40)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  boxShadow: "0 4px 20px rgba(255,107,0,0.3)",
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, color: "#f0f4ff", fontSize: "18px", letterSpacing: "-0.02em" }}>
                  Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span>
                </div>
                <div style={{ fontSize: "9px", color: "#4b5a7a", letterSpacing: "0.12em", fontWeight: 600 }}>PHYSICS EDUPOINT</div>
              </div>
            </div>
            <p style={{ color: "#4b5a7a", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px", maxWidth: "280px" }}>
              Excellence in education. Strong roots create successful minds. Serving students from Rajarampuri, Kolhapur.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,107,0,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,107,0,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: "#f0f4ff", marginBottom: "18px", fontSize: "15px", letterSpacing: "-0.01em" }}>
              Subjects
            </h4>
            {["Physics", "Chemistry", "Mathematics", "Biology", "Robotics", "Olympiad Prep"].map((s) => (
              <Link
                key={s}
                href={`/subjects/${s.toLowerCase().replace(" ", "-")}`}
                style={{
                  display: "block",
                  color: "#4b5a7a",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginBottom: "10px",
                  transition: "color 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6B00"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4b5a7a"; }}
              >
                → {s}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: "#f0f4ff", marginBottom: "18px", fontSize: "15px", letterSpacing: "-0.01em" }}>
              Quick Links
            </h4>
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Login", href: "/login" },
              { label: "Register Free", href: "/register" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  color: "#4b5a7a",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginBottom: "10px",
                  transition: "color 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF6B00"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4b5a7a"; }}
              >
                → {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, color: "#f0f4ff", marginBottom: "18px", fontSize: "15px", letterSpacing: "-0.01em" }}>
              Get In Touch
            </h4>
            <div style={{ color: "#4b5a7a", fontSize: "14px", lineHeight: 2 }}>
              <p>📍 Rajarampuri, Kolhapur, Maharashtra</p>
              <p>📞 +91 72760 18488</p>
              <p>✉️ info@yuvigurukul.in</p>
            </div>
            <a
              href="https://wa.me/917276018488"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: "18px", fontSize: "13px", padding: "10px 18px" }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "#2d3a50", fontSize: "13px" }}>
            © {new Date().getFullYear()} Yuvi Gurukul (Physics Edupoint). All rights reserved.
          </p>
          <p style={{ color: "#2d3a50", fontSize: "13px" }}>
            Made with ❤️ in Kolhapur, Maharashtra 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
