const express = require("express");
const Project = require("../models/project");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new project (auth required)
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    let { files } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!Array.isArray(files) || files.length === 0) {
      files = [
        { name: "App.js", code: "export default function App(){\n  return <h1>Hello CipherStudio!</h1>;\n}" },
        { name: "index.js", code: "import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\ncreateRoot(document.getElementById('root')).render(<App />);" },
        { name: "styles.css", code: "body{font-family:sans-serif;background:#fafafa;}" }
      ];
    }
    const project = await Project.create({ owner: req.userId, name, files });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all projects for current user
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific project by ID (must belong to user)
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.userId });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a project (must belong to user)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, files } = req.body;
    const update = { updatedAt: new Date() };
    if (name !== undefined) update.name = name;
    if (files !== undefined) update.files = files;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      update,
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a project (must belong to user)
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Project.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!result) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
