import express from 'express';
import { register, login, logout } from '../controllers/auth.js';

// import du controller
const router = express.Router();

// routes pour les utilisateurs
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;