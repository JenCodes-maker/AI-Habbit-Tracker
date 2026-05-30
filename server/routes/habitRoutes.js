import express from "express";

import {
  createHabit,
  getHabits,
  deleteHabit,
  toggleHabit,
  updateHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.post("/", createHabit);

router.get("/", getHabits);

router.delete("/:id", deleteHabit);

router.put("/:id", toggleHabit);

router.put("/edit/:id", updateHabit);

export default router;