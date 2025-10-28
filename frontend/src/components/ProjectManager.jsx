import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await API.listProjects();
      setProjects(res);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!newName.trim()) return;
    const res = await API.createProject({ name: newName });
    setNewName("");
    await loadProjects();
    navigate(`/ide/${res._id}`);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await API.deleteProject(id);
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
        minHeight: "100vh",
        background: palette.bg,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 24,
        color: palette.ink,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: palette.card,
          border: `2px solid ${palette.line}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header strip */}
        <div
          style={{
            background: palette.accent,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 800,
            letterSpacing: 0.4,
          }}
        >
          <span>Projects</span>
          <span style={{ opacity: 0.8 }}>{projects.length} total</span>
        </div>

        {/* Body */}
        <div style={{ padding: 20 }}>
          {/* Create row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New project name"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: `2px solid ${palette.line}`,
                background: "#fff",
                outline: "none",
              }}
            />
            <button
              onClick={createProject}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: palette.ink,
                color: "#fff",
                border: `2px solid ${palette.ink}`,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </div>

          {/* List */}
          {loading ? (
            <div style={{ padding: 12, color: "#6b6b6b" }}>Loading…</div>
          ) : projects.length === 0 ? (
            <div
              style={{
                padding: 20,
                border: `2px dashed ${palette.line}`,
                borderRadius: 12,
                textAlign: "center",
                color: "#6b6b6b",
              }}
            >
              No projects yet. Create one to get started!
            </div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {projects.map((p) => (
                <li
                  key={p._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#ffffff",
                    border: `2px solid ${palette.line}`,
                    borderRadius: 12,
                    padding: "10px 12px",
                    marginBottom: 10,
                  }}
                >
                  <button
                    onClick={() => navigate(`/ide/${p._id}`)}
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {p.name}
                  </button>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => navigate(`/ide/${p._id}`)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: `2px solid ${palette.ink}`,
                        background: "transparent",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => deleteProject(p._id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 12,
                        border: `2px solid #b00020`,
                        background: "#ffecec",
                        color: "#b00020",
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
