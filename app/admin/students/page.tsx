"use client";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string | null;
  email: string;
  isActive: boolean;
  createdAt: string;
  image: string | null;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetch("/api/admin/students")
      .then((r) => r.json())
      .then((data) => { setStudents(data); setLoading(false); });
  }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    const res = await fetch("/api/admin/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !isActive }),
    });
    if (res.ok) {
      setStudents((prev) => prev.map((s) => s.id === id ? { ...s, isActive: !isActive } : s));
      showToast(isActive ? "Student disabled" : "Student enabled");
    }
  };

  const filtered = students.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "32px" }}>
      {toast.show && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "26px", color: "#f1f5f9", marginBottom: "4px" }}>
          👥 Student Management
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>{students.length} registered students</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px", maxWidth: "480px" }}>
        {[
          { label: "Total", value: students.length, color: "#3b82f6" },
          { label: "Active", value: students.filter((s) => s.isActive).length, color: "#10b981" },
          { label: "Disabled", value: students.filter((s) => !s.isActive).length, color: "#ef4444" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
            <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "24px", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        className="form-input"
        placeholder="🔍 Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: "380px", marginBottom: "20px" }}
        id="student-search"
      />

      {/* Table */}
      <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>No students found</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: s.image ? `url(${s.image})` : "linear-gradient(135deg, #FF6B00, #FF8C40)",
                          backgroundSize: "cover", backgroundPosition: "center",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontWeight: 700, fontSize: "13px", flexShrink: 0,
                        }}>
                          {!s.image && (s.name?.[0] || "S")}
                        </div>
                        <span style={{ fontWeight: 500 }}>{s.name || "Unnamed Student"}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: "13px", color: "#94a3b8" }}>{s.email}</td>
                    <td style={{ fontSize: "13px", color: "#64748b" }}>
                      {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td>
                      <span style={{
                        fontSize: "11px", fontWeight: 700,
                        color: s.isActive ? "#4ade80" : "#f87171",
                        background: s.isActive ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                        border: `1px solid ${s.isActive ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
                        padding: "3px 10px", borderRadius: "100px",
                      }}>
                        {s.isActive ? "● Active" : "● Disabled"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleActive(s.id, s.isActive)}
                        style={{
                          background: s.isActive ? "rgba(239,68,68,0.1)" : "rgba(74,222,128,0.1)",
                          border: `1px solid ${s.isActive ? "rgba(239,68,68,0.2)" : "rgba(74,222,128,0.2)"}`,
                          borderRadius: "6px",
                          padding: "6px 12px",
                          color: s.isActive ? "#f87171" : "#4ade80",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        {s.isActive ? "🚫 Disable" : "✅ Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
