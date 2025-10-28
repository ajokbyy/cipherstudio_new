import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const palette = {
  bg: "#1f1f1f",
  card: "#fff4ee",
  ink: "#232323",
  accent: "#f5b4a6",
  line: "#e9d7cf",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const fn = mode === "login" ? API.login : API.register;
      const res = await fn(email, password);
      localStorage.setItem("token", res.token);
      navigate("/projects");
    } catch (err) {
      setError(err.message || "Failed to submit");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: palette.bg,
        color: palette.ink,
        padding: 16,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <div
        style={{
          width: 340,
          background: palette.card,
          border: `2px solid ${palette.line}`,
          borderRadius: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Header strip */}
        <div
          style={{
            background: palette.accent,
            color: palette.ink,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          <span>{new Date().toLocaleDateString()}</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: palette.ink, display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: palette.ink, display: "inline-block", opacity: 0.6 }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: palette.ink, display: "inline-block", opacity: 0.35 }} />
          </div>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} style={{ padding: 20 }}>
          <div style={{ textAlign: "left" }}>
            <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.1 }}>Welcome</h1>
            <p style={{ marginTop: 8, color: "#5f5a57", fontSize: 13 }}>
              {mode === "login" ? "Sign in to continue your work." : "Create your account to get started."}
            </p>
          </div>

          {error && (
            <div style={{ color: "#b00020", background: "#ffecec", border: "1px solid #ffc5c5", padding: 8, borderRadius: 8, marginTop: 8 }}>
              {error}
            </div>
          )}

          <label style={{ display: "block", textAlign: "left", fontSize: 12, marginTop: 16, color: "#6b6b6b" }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: `2px solid ${palette.line}`,
              background: "#fff",
              outline: "none",
              marginTop: 6,
              fontSize: 14,
            }}
          />

          <label style={{ display: "block", textAlign: "left", fontSize: 12, marginTop: 12, color: "#6b6b6b" }}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: `2px solid ${palette.line}`,
              background: "#fff",
              outline: "none",
              marginTop: 6,
              fontSize: 14,
            }}
          />

          {/* Primary CTA (template-like pill) */}
          <button
            type="submit"
            style={{
              marginTop: 18,
              width: "100%",
              background: palette.ink,
              color: "#fff",
              border: `2px solid ${palette.ink}`,
              borderRadius: 999,
              padding: "10px 14px",
              fontWeight: 800,
              letterSpacing: 0.3,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "LOGIN" : "CREATE ACCOUNT"}
          </button>

          {/* Secondary CTA styled like the template's "NAH." */}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            style={{
              marginTop: 10,
              width: "100%",
              background: palette.accent,
              color: palette.ink,
              border: `2px solid ${palette.ink}`,
              borderRadius: 12,
              padding: "10px 14px",
              fontWeight: 800,
              letterSpacing: 0.3,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "NEED AN ACCOUNT? REGISTER" : "HAVE AN ACCOUNT? LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}


