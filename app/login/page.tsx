"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0e1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      {/* Glows */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(26,35,126,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div style={{ width: "44px", height: "44px", background: "linear-gradient(135deg, #FF6B00, #FF8C40)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>⚡</div>
            <div>
              <div style={{ fontFamily: "Poppins", fontWeight: 800, fontSize: "20px", color: "#f1f5f9" }}>Yuvi <span style={{ color: "#FF6B00" }}>Gurukul</span></div>
              <div style={{ fontSize: "10px", color: "#64748b" }}>PHYSICS EDUPOINT</div>
            </div>
          </Link>
          <h1 style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "26px", color: "#f1f5f9", marginBottom: "8px" }}>Welcome Back! 👋</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Login to continue your learning journey</p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #1e293b",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", color: "#f87171", fontSize: "14px" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            id="google-login-btn"
            style={{
              width: "100%",
              background: "#1a2236",
              border: "1px solid #2d3748",
              borderRadius: "10px",
              padding: "12px",
              color: "#f1f5f9",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "24px",
              transition: "all 0.2s",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "#1e293b" }} />
            <span style={{ fontSize: "13px", color: "#475569" }}>or login with email</span>
            <div style={{ flex: 1, height: "1px", background: "#1e293b" }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="login-email"
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id="login-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              id="login-submit"
              style={{ width: "100%", justifyContent: "center", fontSize: "16px", padding: "14px", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Logging in..." : "Login to Dashboard 🚀"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#64748b" }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "#FF6B00", fontWeight: 600, textDecoration: "none" }}>
              Register Free
            </Link>
          </p>

          <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: "#475569" }}>
            Admin?{" "}
            <Link href="/admin" style={{ color: "#94a3b8", textDecoration: "none" }}>
              Go to Admin Panel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
