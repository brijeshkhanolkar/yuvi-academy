"use client";
import { useState, useEffect } from "react";

interface Announcement { id: string; title: string; content: string; isActive: boolean; createdAt: string; }

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg: string, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const load = () => {
    fetch("/api/announcements").then((r) => r.json()).then(setItems).catch(() => setItems([]));
  };
  useEffect(load, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/announcements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      showToast("Announcement posted!");
      setForm({ title: "", content: "" });
      setShowForm(false);
      load();
    } else {
      showToast("Failed to post", "error");
    }
    setLoading(false);
  };

  const toggleAnn = async (id: string, isActive: boolean) => {
    await fetch("/api/announcements", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isActive: !isActive }) });
    load();
    showToast(isActive ? "Announcement hidden" : "Announcement shown");
  };

  const deleteAnn = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    await fetch("/api/announcements", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
    showToast("Deleted");
  };

  return (
    <div style={{ padding: "32px" }}>
      {toast.show && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "26px", color: "#f1f5f9", marginBottom: "4px" }}>📢 Announcements</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Post updates visible to all students</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary" id="add-ann-btn" style={{ fontSize: "14px", padding: "11px 22px" }}>
          ➕ New Announcement
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#111827", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "17px", color: "#f1f5f9", marginBottom: "16px" }}>📢 New Announcement</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "14px" }}>
              <label className="form-label">Title</label>
              <input className="form-input" placeholder="Announcement title..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required id="ann-title" />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label">Content</label>
              <textarea className="form-input" rows={3} placeholder="Announcement details..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required id="ann-content" />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={loading} className="btn-primary" style={{ fontSize: "14px", padding: "11px 24px" }}>
                {loading ? "Posting..." : "Post Announcement"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary" style={{ fontSize: "14px", padding: "11px 24px" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.length === 0 ? (
          <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📢</div>
            <p style={{ color: "#64748b" }}>No announcements yet. Create one above!</p>
          </div>
        ) : (
          items.map((ann) => (
            <div key={ann.id} style={{ background: "#111827", border: `1px solid ${ann.isActive ? "rgba(255,107,0,0.2)" : "#1e293b"}`, borderRadius: "14px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", fontSize: "15px" }}>{ann.title}</h3>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: ann.isActive ? "#4ade80" : "#64748b", background: ann.isActive ? "rgba(74,222,128,0.1)" : "#1a2236", padding: "2px 8px", borderRadius: "100px" }}>
                      {ann.isActive ? "● Live" : "● Hidden"}
                    </span>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6 }}>{ann.content}</p>
                  <p style={{ color: "#475569", fontSize: "12px", marginTop: "8px" }}>{new Date(ann.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => toggleAnn(ann.id, ann.isActive)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "6px", padding: "7px 14px", color: "#60a5fa", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                    {ann.isActive ? "👁 Hide" : "👁 Show"}
                  </button>
                  <button onClick={() => deleteAnn(ann.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "7px 14px", color: "#f87171", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
