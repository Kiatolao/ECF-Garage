import express from 'express';
import { getCars, getCar, addCar, deleteCar, updateCar } from '../controllers/car.js';


// creation du router
const router = express.Router();

// routes pour les voitures
router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", addCar);
router.delete("/:id", deleteCar);
router.put("/:id", updateCar);

export default router;