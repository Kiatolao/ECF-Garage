import express from 'express';
import { getServices, getService, addService, deleteService } from '../controllers/service.js';

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", addService);
router.delete("/:id", deleteService);

export default router;