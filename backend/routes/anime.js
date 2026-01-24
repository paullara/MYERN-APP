import express from "express";
import db from "../config/db.js";

const router = express.Router();

//get all animes
router.get("/", (req, res) => {
  db.query("SELECT * FROM anime", (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.json(rows);
  });
});

//show by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM anime WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.json(rows);
  });
});

//post anime route
router.post("/", (req, res) => {
  const { name, genre, rating } = req.body;
  db.query(
    "INSERT INTO anime (name, genre, rating) VALUES (?, ?, ?)",
    [name, genre, rating],
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json({ id: result.insertId, name, genre, rating });
    },
  );
});

//update anime
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, genre, rating } = req.body;
  db.query(
    "UPDATE anime SET name = ?, genre = ?, rating = ? WHERE id = ?",
    [name, genre, rating, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Anime updated" });
    },
  );
});

//delete anime
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM anime WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Anime deleted" });
  });
});

export default router;
