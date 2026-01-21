import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// CREATE a user
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name },
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name },
    });
    return res.json({ message: "User updated", user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
