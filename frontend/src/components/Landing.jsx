import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");
  const palette = {
    bg: "#1f1f1f",
    card: "#fff4ee",
    ink: "#232323",
    line: "#e9d7cf",
    accent: "#f5b4a6",
  };

  return (
    <div
      style={{
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial",
        backgroundColor: palette.bg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        color: palette.ink,
      }}
    >
      {/* Navbar */}
      <header
        style={{
          position: "fixed",
          top: 12,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            background: "rgba(35,35,35,0.85)",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                background: palette.accent,
                color: palette.ink,
                border: `2px solid ${palette.ink}`,
                borderRadius: 999,
                padding: "2px 8px",
                fontWeight: 800,
                letterSpacing: 0.3,
              }}
            >
              ⚡
            </span>
            <h3 style={{ margin: 0, fontWeight: 800 }}>CipherStudio</h3>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="#docs" style={{ color: "#e7e7e7", textDecoration: "none", fontWeight: 600 }}>Docs</a>
            <a href="#projects" style={{ color: "#e7e7e7", textDecoration: "none", fontWeight: 600 }}>Projects</a>
            <a href="#about" style={{ color: "#e7e7e7", textDecoration: "none", fontWeight: 600 }}>About</a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => navigate("/projects")}
              style={{
                padding: "8px 12px",
                background: "transparent",
                color: "#fff",
                border: `2px solid ${palette.accent}`,
                borderRadius: 999,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Open IDE
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "8px 12px",
                  background: palette.accent,
                  color: palette.ink,
                  border: `2px solid ${palette.ink}`,
                  borderRadius: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          marginTop: 100,
          background: palette.card,
          border: `2px solid ${palette.line}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ background: palette.accent, padding: "12px 18px", textAlign: "left", fontWeight: 800 }}>WELCOME</div>
        <div style={{ padding: 28 }}>
          <h1 style={{ fontSize: 44, margin: 0, lineHeight: 1 }}>Build React apps instantly</h1>
          <p style={{ fontSize: 16, marginTop: 10, color: "#5f5a57" }}>
            A browser-based IDE with live preview, Monaco editor, and per-user saved projects.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", marginTop: 18 }}>
            <button
              onClick={() => navigate("/projects")}
              style={{
                padding: "12px 24px",
                backgroundColor: palette.ink,
                color: "#fff",
                border: `2px solid ${palette.ink}`,
                cursor: "pointer",
                fontSize: 16,
                borderRadius: 999,
                fontWeight: 800,
              }}
            >
              🚀 Launch IDE
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "10px 22px",
                  backgroundColor: palette.accent,
                  color: palette.ink,
                  border: `2px solid ${palette.ink}`,
                  cursor: "pointer",
                  fontSize: 16,
                  borderRadius: 12,
                  fontWeight: 800,
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Docs Section */}
        <section
          id="docs"
          style={{
            scrollMarginTop: "80px",
            marginTop: "60px",
            background: palette.card,
            border: `2px solid ${palette.line}`,
            borderRadius: "16px",
            padding: "24px",
            textAlign: "left",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Docs</h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Start by creating a project, edit files on the left, and preview on the right.
          </p>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          style={{
            scrollMarginTop: "80px",
            marginTop: "20px",
            background: palette.card,
            border: `2px solid ${palette.line}`,
            borderRadius: "16px",
            padding: "24px",
            textAlign: "left",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Projects</h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            View your saved projects and continue where you left off.
          </p>
          <button
            onClick={() => navigate("/projects")}
            style={{
              marginTop: "8px",
              padding: "10px 18px",
              backgroundColor: palette.ink,
              color: "#fff",
              border: `2px solid ${palette.ink}`,
              cursor: "pointer",
              fontSize: "0.95rem",
              borderRadius: "8px",
            }}
          >
            Go to Projects
          </button>
        </section>

        {/* About Section (fix overflow) */}
        <section
          id="about"
          style={{
            scrollMarginTop: "80px",
            marginTop: "20px",
            background: palette.card,
            border: `2px solid ${palette.line}`,
            borderRadius: "16px",
            padding: "24px",
            textAlign: "left",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          <h2 style={{ marginTop: 0 }}>About</h2>
          <p style={{ color: "#555", lineHeight: 1.7 }}>
            CipherStudio is a minimal, browser-based React playground that lets you prototype
            components instantly. Your projects are saved securely to your account so you can
            come back later and keep building.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "60px", color: "#bdb7b4" }}>
        <p>© 2025 CipherStudio. Built with ❤️ by Abhiraj Singh Chouhan.</p>
      </footer>
    </div>
  );
}
