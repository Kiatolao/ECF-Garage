import express from 'express';
import { getMessages, getMessage, addMessage, deleteMessage } from '../controllers/message.js';

const router = express.Router();

// Routes pour les messages
router.get('/', getMessages);
router.get('/:id', getMessage);
router.post('/', addMessage);
router.delete('/:id', deleteMessage);

export default router;
