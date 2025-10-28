import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import FileExplorer from "./FileExplorer";
import { createRoot } from "react-dom/client";
import { useParams } from "react-router-dom";
import API from "../api";

export default function IDE() {
  const { id: routeProjectId } = useParams();
  const [projectId, setProjectId] = useState(routeProjectId || null);
  const [projectName, setProjectName] = useState("My Project");
  const [files, setFiles] = useState([
    { name: "App.js", code: `export default function App() {\n  return <h1>Hello CipherStudio!</h1>;\n}` },
    { name: "index.js", code: `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')).render(<App />);` },
    { name: "styles.css", code: `body { background: #fafafa; font-family: sans-serif; }` },
  ]);

  const [currentFile, setCurrentFile] = useState("App.js");
  const iframeRef = useRef(null);

  // ✅ Update code in memory
  const activeCode = files.find((f) => f.name === currentFile)?.code;
  const updateCode = (newCode) => {
    setFiles((prev) =>
      prev.map((f) => (f.name === currentFile ? { ...f, code: newCode } : f))
    );
  };

  // ✅ Transpile JSX
  const transpile = (code) => {
    const cleaned = code
      .replace(/export\s+default\s+/g, "")
      .replace(/import\s+.*from\s+['"].*['"];?/g, "")
      .trim();
    return Babel.transform(cleaned, { presets: ["react"] }).code;
  };

  // ✅ Render in iframe
  const renderPreview = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const iframeDoc = iframe.contentDocument;
    iframeDoc.open();
    iframeDoc.write(`<!DOCTYPE html><html><body><div id="root"></div></body></html>`);
    iframeDoc.close();

    // Pick an entry file: prefer App.js, otherwise first JS/JSX file, otherwise fallback
    const jsCandidates = files.filter((f) => /\.(js|jsx)$/.test(f.name));
    const appFile = files.find((f) => f.name === "App.js") || jsCandidates[0];
    const cssFile = files.find((f) => f.name && f.name.endsWith(".css"));
    try {
      const sourceCode = appFile?.code || "export default function App(){return null}";
      const compiledApp = transpile(sourceCode);
      const AppComponent = new Function(
        "React",
        `"use strict"; ${compiledApp}; return App;`
      )(React);

      if (cssFile) {
        const style = iframeDoc.createElement("style");
        style.innerHTML = cssFile.code;
        iframeDoc.head.appendChild(style);
      }

      const root = createRoot(iframeDoc.getElementById("root"));
      const Fallback = () => React.createElement("div", null, "No App component");
      const ComponentToRender = typeof AppComponent === "function" ? AppComponent : Fallback;
      root.render(<ComponentToRender />);
    } catch (err) {
      iframeDoc.body.innerHTML = `<pre style=\"color:red\">${err.message}</pre>`;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(renderPreview, 400);
    return () => clearTimeout(timeout);
  }, [files, currentFile]);

  // ✅ Save project to MongoDB (auth)
  const saveProject = async () => {
    const project = { name: projectName, files };
    if (!projectId) {
      const created = await API.createProject(project);
      setProjectId(created._id);
      alert(`💾 Project saved! ID: ${created._id}`);
      return;
    }
    const updated = await API.updateProject(projectId, project);
    alert("💾 Project updated!");
  };

  // ✅ Load project if route has id
  useEffect(() => {
    const load = async () => {
      if (!routeProjectId) return;
      const data = await API.getProject(routeProjectId);
      if (data && data.files) {
        const loaded = Array.isArray(data.files) ? data.files : [];
        if (loaded.length === 0) {
          setFiles([
            { name: "App.js", code: "export default function App(){\n  return <h1>Hello CipherStudio!</h1>;\n}" },
            { name: "styles.css", code: "body{font-family:sans-serif;}" }
          ]);
        } else {
          setFiles(loaded);
        }
        setProjectId(data._id);
        setProjectName(data.name);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeProjectId]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <FileExplorer
        files={files}
        currentFile={currentFile}
        onSelect={setCurrentFile}
        onAdd={(name) =>
          setFiles((prev) => [...prev, { name, code: "// new file" }])
        }
        onDelete={(name) =>
          setFiles((prev) => prev.filter((f) => f.name !== name))
        }
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", padding: "5px", background: "#222" }}>
          <input
            style={{
              flex: 1,
              marginRight: "8px",
              background: "#333",
              color: "white",
              border: "1px solid #555",
              padding: "5px",
            }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <button onClick={saveProject}>💾 Save</button>
        </div>

        <Editor
          height="100%"
          language={currentFile.endsWith(".css") ? "css" : "javascript"}
          theme="vs-dark"
          value={activeCode || ""}
          onChange={(value) => updateCode(value || "")}
        />
      </div>

      <div style={{ flex: 1, background: "#fff", borderLeft: "2px solid #333" }}>
        <iframe
          ref={iframeRef}
          title="preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
