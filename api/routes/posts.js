import express from 'express';
import { getPosts, getPost, addPost, deletePost, updatePost } from '../controllers/post.js';


// creation du router
const router = express.Router();

// routes pour les posts
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;