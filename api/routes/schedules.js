import express from 'express';
import { getSchedules, getSchedule, addSchedule, deleteSchedule, updateSchedule } from '../controllers/schedule.js';

const router = express.Router();

// Routes pour les horaires
router.get("/", getSchedules);
router.get("/:id", getSchedule);
router.post("/", addSchedule);
router.delete("/:id", deleteSchedule);
router.put("/:id", updateSchedule);

export default router;
