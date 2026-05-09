"use client";
import { useState, useEffect } from "react";

interface Subject { id: string; name: string; slug: string; }
interface Chapter { id: string; title: string; subjectId: string; }
interface Video { id: string; title: string; youtubeId: string; duration?: string; chapterId: string; isFeatured: boolean; order: number; chapter: { title: string; subject: { name: string } }; }

export default function AdminVideosPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selSubject, setSelSubject] = useState("");
  const [selChapter, setSelChapter] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [form, setForm] = useState({
    title: "", youtubeId: "", duration: "", chapterId: "", isFeatured: false, order: 0, description: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const showToast = (msg: string, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetch("/api/subjects").then((r) => r.json()).then(setSubjects);
    fetch("/api/videos").then((r) => r.json()).then(setVideos);
  }, []);

  useEffect(() => {
    if (selSubject) {
      fetch(`/api/chapters?subjectId=${selSubject}`).then((r) => r.json()).then(setChapters);
    }
  }, [selSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = "/api/videos";
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      showToast(editId ? "Video updated!" : "Video added!");
      setShowForm(false);
      setEditId(null);
      setForm({ title: "", youtubeId: "", duration: "", chapterId: "", isFeatured: false, order: 0, description: "" });
      const data = await fetch("/api/videos").then((r) => r.json());
      setVideos(data);
    } else {
      showToast("Failed to save video", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    await fetch("/api/videos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setVideos((prev) => prev.filter((v) => v.id !== id));
    showToast("Video deleted");
  };

  const startEdit = (v: Video) => {
    setForm({ title: v.title, youtubeId: v.youtubeId, duration: v.duration || "", chapterId: v.chapterId, isFeatured: v.isFeatured, order: v.order, description: "" });
    setEditId(v.id);
    setShowForm(true);
  };

  const filteredVideos = selChapter ? videos.filter((v) => v.chapterId === selChapter) : videos;

  return (
    <div style={{ padding: "32px" }}>
      {/* Toast */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "26px", color: "#f1f5f9", marginBottom: "4px" }}>🎥 Video Management</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>{videos.length} total videos</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ title: "", youtubeId: "", duration: "", chapterId: "", isFeatured: false, order: 0, description: "" }); }}
          className="btn-primary"
          id="add-video-btn"
          style={{ fontSize: "14px", padding: "11px 22px" }}
        >
          ➕ Add New Video
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: "#111827", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "17px", color: "#f1f5f9" }}>
              {editId ? "✏️ Edit Video" : "➕ Add New Video"}
            </h2>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "20px" }}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label className="form-label">Video Title *</label>
                <input className="form-input" placeholder="e.g. Newton's Laws of Motion" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required id="video-title" />
              </div>
              <div>
                <label className="form-label">YouTube URL or ID *</label>
                <input className="form-input" placeholder="https://youtube.com/watch?v=... or video ID" value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} required id="video-youtube" />
              </div>
              <div>
                <label className="form-label">Duration (optional)</label>
                <input className="form-input" placeholder="e.g. 45:30" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} id="video-duration" />
              </div>
              <div>
                <label className="form-label">Order (position in chapter)</label>
                <input type="number" className="form-input" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} id="video-order" />
              </div>
              <div>
                <label className="form-label">Subject *</label>
                <select
                  className="form-input"
                  value={selSubject}
                  onChange={(e) => { setSelSubject(e.target.value); setSelChapter(""); setForm({ ...form, chapterId: "" }); }}
                  id="video-subject"
                >
                  <option value="">-- Select Subject --</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Chapter *</label>
                <select
                  className="form-input"
                  value={form.chapterId}
                  onChange={(e) => setForm({ ...form, chapterId: e.target.value })}
                  required
                  id="video-chapter"
                  disabled={!selSubject}
                >
                  <option value="">-- Select Chapter --</option>
                  {chapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label">Description (optional)</label>
              <textarea className="form-input" rows={2} placeholder="Brief description of this lecture..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} id="video-desc" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <input type="checkbox" id="featured-check" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} style={{ width: "16px", height: "16px", accentColor: "#FF6B00" }} />
              <label htmlFor="featured-check" style={{ fontSize: "14px", color: "#94a3b8", cursor: "pointer" }}>
                ⭐ Mark as Featured (show on homepage)
              </label>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={loading} className="btn-primary" id="video-submit" style={{ fontSize: "14px", padding: "11px 24px", opacity: loading ? 0.7 : 1 }}>
                {loading ? "Saving..." : editId ? "Update Video" : "Add Video"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary" style={{ fontSize: "14px", padding: "11px 24px" }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select
          className="form-input"
          style={{ width: "auto", minWidth: "180px" }}
          value={selSubject}
          onChange={(e) => { setSelSubject(e.target.value); setSelChapter(""); }}
          id="filter-subject"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select
          className="form-input"
          style={{ width: "auto", minWidth: "200px" }}
          value={selChapter}
          onChange={(e) => setSelChapter(e.target.value)}
          disabled={!selSubject}
          id="filter-chapter"
        >
          <option value="">All Chapters</option>
          {chapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>

      {/* Videos Table */}
      <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e293b" }}>
          <span style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "15px" }}>
            {filteredVideos.length} {selChapter ? "videos in chapter" : "total videos"}
          </span>
        </div>
        {filteredVideos.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎥</div>
            <p style={{ color: "#64748b" }}>No videos yet. Click "Add New Video" to get started!</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Video</th>
                  <th>Subject / Chapter</th>
                  <th>Duration</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                          alt={v.title}
                          style={{ width: "60px", height: "36px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                        />
                        <div>
                          <div style={{ fontWeight: 500, maxWidth: "240px" }}>{v.title}</div>
                          <div style={{ fontSize: "11px", color: "#64748b" }}>ID: {v.youtubeId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "13px" }}>{v.chapter.subject.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>{v.chapter.title}</div>
                    </td>
                    <td style={{ fontSize: "13px" }}>{v.duration || "—"}</td>
                    <td>
                      <span style={{
                        fontSize: "11px", fontWeight: 700,
                        color: v.isFeatured ? "#f59e0b" : "#475569",
                        background: v.isFeatured ? "rgba(245,158,11,0.1)" : "transparent",
                        padding: "2px 8px", borderRadius: "100px",
                      }}>
                        {v.isFeatured ? "⭐ Featured" : "—"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => startEdit(v)}
                          style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "6px", padding: "6px 12px", color: "#60a5fa", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
                          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", padding: "6px 12px", color: "#f87171", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
                        >
                          🗑 Delete
                        </button>
                      </div>
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
