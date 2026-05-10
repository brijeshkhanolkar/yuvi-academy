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
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "rgba(8,12,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
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
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg, #FF6B00, #FF8C40)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 4px 20px rgba(255,107,0,0.4), 0 0 40px rgba(255,107,0,0.1)",
              }}
            >
              ⚡
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 800,
                  fontSize: "19px",
                  color: "#f0f4ff",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span>
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#4b5a7a",
                  letterSpacing: "0.12em",
                  marginTop: "2px",
                  fontWeight: 600,
                }}
              >
                PHYSICS EDUPOINT
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 18px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "#FF6B00" : "#94a3b8",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  background: isActive ? "rgba(255,107,0,0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(255,107,0,0.2)" : "1px solid transparent",
                  fontFamily: "Space Grotesk, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.08)", margin: "0 12px" }} />

          <Link
            href="/login"
            style={{
              padding: "9px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#94a3b8",
              textDecoration: "none",
              transition: "all 0.25s ease",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "Space Grotesk, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#f0f4ff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#94a3b8";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            Login
          </Link>
          <Link href="/register" className="btn-primary" style={{ padding: "9px 20px", fontSize: "14px", marginLeft: "6px" }}>
            Get Started ✨
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#f0f4ff",
            cursor: "pointer",
            padding: "8px 12px",
            fontSize: "18px",
          }}
          className="mobile-menu-btn"
          id="mobile-menu-toggle"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(8,12,24,0.98)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 28px",
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
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                color: pathname === link.href ? "#FF6B00" : "#94a3b8",
                textDecoration: "none",
                marginBottom: "4px",
                fontFamily: "Space Grotesk, sans-serif",
                background: pathname === link.href ? "rgba(255,107,0,0.08)" : "transparent",
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
