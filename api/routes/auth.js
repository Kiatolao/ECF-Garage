import express from 'express';
import { register, login, logout, getUsers, deleteUser } from '../controllers/auth.js';

// import du controller
const router = express.Router();

// routes pour les utilisateurs
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;