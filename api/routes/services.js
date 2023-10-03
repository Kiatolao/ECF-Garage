import express from 'express';
import { getServices, getService, addService, deleteService, updateService } from '../controllers/service.js';


const router = express.Router();

router.get("/", verifyToken, getServices);
router.get("/:id", verifyToken, getService);
router.post("/", verifyToken, addService);
router.put("/:id", verifyToken, updateService);
router.delete("/:id", verifyToken, deleteService);

export default router;