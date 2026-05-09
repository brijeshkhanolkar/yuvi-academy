import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@physicsedupoint", icon: "▶️" },
  { label: "WhatsApp", href: "https://wa.me/917276018488", icon: "💬" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#060a14",
        borderTop: "1px solid #1e293b",
        padding: "60px 0 30px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #FF6B00, #FF8C40)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontFamily: "Poppins", fontWeight: 800, color: "#f1f5f9", fontSize: "18px" }}>
                  Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span>
                </div>
                <div style={{ fontSize: "10px", color: "#64748b" }}>PHYSICS EDUPOINT</div>
              </div>
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              Excellence in Education. Strong roots create successful minds. Rajarampuri, Kolhapur.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    background: "rgba(255,107,0,0.1)",
                    border: "1px solid rgba(255,107,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px", fontSize: "15px" }}>
              Subjects
            </h4>
            {["Physics", "Chemistry", "Mathematics", "Biology", "Robotics", "Olympiad Prep"].map((s) => (
              <Link
                key={s}
                href={`/subjects/${s.toLowerCase().replace(" ", "-")}`}
                style={{
                  display: "block",
                  color: "#64748b",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginBottom: "8px",
                  transition: "color 0.2s",
                }}
              >
                → {s}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px", fontSize: "15px" }}>
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
                  color: "#64748b",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                → {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", marginBottom: "16px", fontSize: "15px" }}>
              Contact Us
            </h4>
            <div style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.8 }}>
              <p>📍 Rajarampuri, Kolhapur, Maharashtra</p>
              <p>📞 +91 72760 18488</p>
              <p>✉️ info@yuvigurukul.in</p>
              <p>🌐 yuvigurukul.in</p>
            </div>
            <a
              href="https://wa.me/917276018488"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: "16px", fontSize: "13px", padding: "10px 18px" }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1e293b",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ color: "#475569", fontSize: "13px" }}>
            © {new Date().getFullYear()} Yuvi Gurukul (Physics Edupoint). All rights reserved.
          </p>
          <p style={{ color: "#475569", fontSize: "13px" }}>
            Made with ❤️ in Kolhapur, Maharashtra
          </p>
        </div>
      </div>
    </footer>
  );
}
