import React from "react";
import { Plus, Trash2, FileCode, FileText } from "lucide-react";

export default function FileExplorer({ files, currentFile, onSelect, onAdd, onDelete }) {
  const handleAdd = () => {
    const name = prompt("Enter new file name (e.g., NewFile.js):");
    if (name && !files.some((f) => f.name === name)) {
      onAdd(name);
    } else if (files.some((f) => f.name === name)) {
      alert("File already exists!");
    }
  };

  const handleDelete = () => {
    if (!currentFile) return;
    const confirmDelete = window.confirm(`Delete ${currentFile}?`);
    if (confirmDelete) onDelete(currentFile);
  };

  const getIcon = (file) => {
    if (file.endsWith(".js") || file.endsWith(".jsx")) return <FileCode size={16} />;
    if (file.endsWith(".css")) return <FileText size={16} />;
    return <FileCode size={16} />;
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#151515",
        color: "white",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #333",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #333",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>Files</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <Plus
            size={16}
            style={{ cursor: "pointer", color: "#9cdcfe" }}
            onClick={handleAdd}
          />
          <Trash2
            size={16}
            style={{ cursor: "pointer", color: "#f14c4c" }}
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* File list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {files.map((f) => (
          <div
            key={f.name}
            onClick={() => onSelect(f.name)}
            style={{
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              background: f.name === currentFile ? "#252526" : "transparent",
              color: f.name === currentFile ? "#4fc1ff" : "white",
              fontFamily: "monospace",
              fontSize: "13px",
            }}
          >
            {getIcon(f.name)}
            {f.name}
          </div>
        ))}
      </div>
    </div>
  );
}
