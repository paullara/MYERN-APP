import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM movie", (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, genre } = req.body;
  db.query(
    "INSERT INTO movie (title, genre) VALUES (?, ?)",
    [title, genre],
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json({ id: result.insertId, title, genre });
    },
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre } = req.body;
  db.query(
    "UPDATE movie SET title = ?, genre = ? WHERE id = ?",
    [title, genre, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Movie updated" });
    },
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM movie WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Movie deleted" });
  });
});

export default router;
