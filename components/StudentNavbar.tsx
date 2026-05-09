"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard", href: "/dashboard" },
  { icon: "📚", label: "Subjects", href: "/subjects" },
  { icon: "👤", label: "Profile", href: "/profile" },
];

export default function StudentNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as { name?: string; email?: string; image?: string; role?: string } | undefined;

  return (
    <nav
      style={{
        background: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1e293b",
        position: "sticky",
        top: 0,
        zIndex: 100,
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
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #FF6B00, #FF8C40)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>⚡</div>
          <span style={{ fontFamily: "Poppins", fontWeight: 800, color: "#f1f5f9", fontSize: "16px" }}>Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span></span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "4px" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: pathname === item.href ? "#FF6B00" : "#64748b",
                background: pathname === item.href ? "rgba(255,107,0,0.1)" : "transparent",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user?.role === "admin" && (
            <Link href="/admin" style={{ fontSize: "13px", color: "#FF6B00", fontWeight: 600, textDecoration: "none", padding: "6px 12px", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "6px" }}>
              Admin Panel
            </Link>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: user?.image ? `url(${user.image})` : "linear-gradient(135deg, #FF6B00, #FF8C40)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "white",
                fontSize: "14px",
              }}
            >
              {!user?.image && (user?.name?.[0] || "S")}
            </div>
            <span style={{ fontSize: "13px", color: "#94a3b8", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name || "Student"}
            </span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px",
              padding: "7px 14px",
              color: "#f87171",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: 500,
            }}
            id="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
