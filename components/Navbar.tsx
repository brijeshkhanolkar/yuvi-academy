"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Subjects", href: "/subjects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10, 14, 26, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                boxShadow: "0 4px 15px rgba(255,107,0,0.3)",
              }}
            >
              ⚡
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: "#f1f5f9",
                  lineHeight: 1,
                }}
              >
                Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span>
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#64748b",
                  letterSpacing: "0.5px",
                }}
              >
                PHYSICS EDUPOINT
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: pathname === link.href ? "#FF6B00" : "#94a3b8",
                textDecoration: "none",
                transition: "all 0.2s ease",
                background:
                  pathname === link.href
                    ? "rgba(255,107,0,0.1)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.1)", margin: "0 8px" }} />

          <Link href="/login" className="btn-secondary" style={{ padding: "9px 20px", fontSize: "14px" }}>
            Login
          </Link>
          <Link href="/register" className="btn-primary" style={{ padding: "9px 20px", fontSize: "14px" }}>
            Get Started ✨
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#f1f5f9",
            cursor: "pointer",
            padding: "8px",
          }}
          className="mobile-menu-btn"
          id="mobile-menu-toggle"
        >
          <div style={{ fontSize: "24px" }}>{menuOpen ? "✕" : "☰"}</div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(10,14,26,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 24px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 500,
                color: pathname === link.href ? "#FF6B00" : "#94a3b8",
                textDecoration: "none",
                marginBottom: "4px",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link href="/login" className="btn-secondary" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: "center" }}>
              Login
            </Link>
            <Link href="/register" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ flex: 1, justifyContent: "center" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
