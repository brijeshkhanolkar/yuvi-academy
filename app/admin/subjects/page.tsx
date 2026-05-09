"use client";
import { useState, useEffect } from "react";

interface Subject { id: string; name: string; slug: string; icon: string; color: string; description: string; isActive: boolean; order: number; }

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [form, setForm] = useState({ name: "", slug: "", description: "", icon: "📚", color: "#1a237e", bgGradient: "", order: 0 });

  const showToast = (msg: string, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const load = () => fetch("/api/subjects").then((r) => r.json()).then(setSubjects);
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;
    const res = await fetch("/api/subjects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      showToast(editId ? "Subject updated!" : "Subject created!");
      setShowForm(false);
      setEditId(null);
      setForm({ name: "", slug: "", description: "", icon: "📚", color: "#1a237e", bgGradient: "", order: 0 });
      load();
    } else {
      showToast("Failed to save", "error");
    }
    setLoading(false);
  };

  const startEdit = (s: Subject) => {
    setForm({ name: s.name, slug: s.slug, description: s.description || "", icon: s.icon || "📚", color: s.color, bgGradient: "", order: s.order });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subject and ALL its chapters/videos?")) return;
    await fetch("/api/subjects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
    showToast("Subject deleted");
  };

  return (
    <div style={{ padding: "32px" }}>
      {toast.show && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "26px", color: "#f1f5f9", marginBottom: "4px" }}>📚 Subject Management</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>{subjects.length} subjects configured</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="btn-primary" id="add-subject-btn" style={{ fontSize: "14px", padding: "11px 22px" }}>
          ➕ Add Subject
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#111827", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "17px", color: "#f1f5f9", marginBottom: "16px" }}>
            {editId ? "✏️ Edit Subject" : "➕ New Subject"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label className="form-label">Subject Name *</label>
                <input className="form-input" placeholder="e.g. Physics" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required id="sub-name" />
              </div>
              <div>
                <label className="form-label">Slug (URL) *</label>
                <input className="form-input" placeholder="e.g. physics" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} required id="sub-slug" />
              </div>
              <div>
                <label className="form-label">Icon (emoji)</label>
                <input className="form-input" placeholder="e.g. ⚛️" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} id="sub-icon" />
              </div>
              <div>
                <label className="form-label">Color (hex)</label>
                <input className="form-input" placeholder="#1a237e" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} id="sub-color" />
              </div>
              <div>
                <label className="form-label">Display Order</label>
                <input type="number" className="form-input" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} id="sub-order" />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={2} placeholder="Brief description..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} id="sub-desc" />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={loading} className="btn-primary" style={{ fontSize: "14px", padding: "11px 24px" }}>
                {loading ? "Saving..." : editId ? "Update Subject" : "Create Subject"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary" style={{ fontSize: "14px", padding: "11px 24px" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {subjects.map((s) => (
          <div key={s.id} style={{ background: "#111827", border: `1px solid ${s.color}25`, borderRadius: "14px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${s.color}20`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                {s.icon}
              </div>
              <span style={{ fontSize: "10px", color: s.isActive ? "#4ade80" : "#f87171", fontWeight: 700 }}>
                {s.isActive ? "● Active" : "● Inactive"}
              </span>
            </div>
            <div style={{ fontFamily: "Poppins", fontWeight: 700, color: "#f1f5f9", fontSize: "16px", marginBottom: "4px" }}>{s.name}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>/{s.slug}</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => startEdit(s)} style={{ flex: 1, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "7px", padding: "7px", color: "#60a5fa", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(s.id)} style={{ flex: 1, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "7px", padding: "7px", color: "#f87171", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
