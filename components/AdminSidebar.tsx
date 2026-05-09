"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const ADMIN_NAV = [
  { icon: "📊", label: "Overview", href: "/admin" },
  { icon: "📚", label: "Subjects", href: "/admin/subjects" },
  { icon: "🎥", label: "Videos", href: "/admin/videos" },
  { icon: "👥", label: "Students", href: "/admin/students" },
  { icon: "📢", label: "Announcements", href: "/admin/announcements" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div
      style={{
        width: "240px",
        background: "#111827",
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #FF6B00, #FF8C40)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⚡</div>
          <div>
            <div style={{ fontFamily: "Poppins", fontWeight: 800, color: "#f1f5f9", fontSize: "15px" }}>Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span></div>
          </div>
        </div>
        <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "6px", padding: "4px 10px", display: "inline-block", fontSize: "11px", color: "#FF6B00", fontWeight: 700 }}>
          🛠 ADMIN PANEL
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: "#475569", letterSpacing: "1px", marginBottom: "8px", paddingLeft: "4px" }}>MENU</div>
        {ADMIN_NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "9px",
                fontSize: "14px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#FF6B00" : "#64748b",
                background: isActive ? "rgba(255,107,0,0.1)" : "transparent",
                borderLeft: isActive ? "3px solid #FF6B00" : "3px solid transparent",
                textDecoration: "none",
                transition: "all 0.2s",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "17px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "16px", borderTop: "1px solid #1e293b" }}>
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#64748b",
            textDecoration: "none",
            marginBottom: "8px",
          }}
        >
          🎓 Student View
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            width: "100%",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "8px",
            padding: "9px",
            color: "#f87171",
            fontSize: "13px",
            cursor: "pointer",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
          id="admin-logout"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
