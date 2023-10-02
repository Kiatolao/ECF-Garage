import express from 'express';
import { getSchedules, getSchedule, updateSchedule } from '../controllers/schedule.js';

const router = express.Router();

// Routes pour les horaires
router.get("/", getSchedules);
router.get("/:id", getSchedule);
router.put("/:id", updateSchedule);

export default router;
