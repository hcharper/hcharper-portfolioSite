const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const projectQueries = require("../db/projectQueries");
const { authenticateToken, isAdmin } = require("../middlewares/auth-middleware");

router.get("/images", async (req, res) => {
  try {
    const projectsDir = path.join(__dirname, "../../client/public/projects");
    if (!fs.existsSync(projectsDir)) return res.json([]);
    const files = fs.readdirSync(projectsDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
    });
    res.json(imageFiles);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const project = await projectQueries.createProject(req.body);
    res.status(201).json(project);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get("/", async (req, res) => {
  try {
    const projects = await projectQueries.getAllProjects();
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/featured", async (req, res) => {
  try {
    const projects = await projectQueries.getFeaturedProjects();
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectQueries.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const project = await projectQueries.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const project = await projectQueries.deleteProject(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
