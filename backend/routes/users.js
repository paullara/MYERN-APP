import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO user (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500), json(err);
    return res.json({ id: result.insertId, name });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query("UPDATE user SET name = ? WHERE id =?", [name, id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "User updated" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM user WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "User deleted" });
  });
});

export default router;
