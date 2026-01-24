import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM product", (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { name, price, status } = req.body;
  db.query(
    "INSERT INTO product (name, price, status) VALUES (?, ?, ?)",
    [name, price, status],
    (err, result) => {
      if (err) return res.status(500).json(err);
      return res.json({ id: result.insertId, name, price, status });
    },
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, status } = req.body;
  db.query(
    "UPDATE product SET name = ?, price = ?, status = ? WHERE id = ?",
    [name, price, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "Product updated" });
    },
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM product WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Product deleted" });
  });
});

export default router;
