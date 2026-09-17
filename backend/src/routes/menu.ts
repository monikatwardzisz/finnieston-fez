import express from "express";
import { prisma } from "../prisma/client";

const router = express.Router();





router.get("/", async (req, res) => {
  const menu = await prisma.menuItem.findMany();
  
  res.json(menu);
});

export default router;