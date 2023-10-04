import express from 'express';
import { getServices, getService, addService, deleteService, updateService } from '../controllers/service.js';


const router = express.Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;