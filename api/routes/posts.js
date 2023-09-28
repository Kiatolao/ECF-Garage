import express from 'express';
import  {addPost} from '../controllers/post.js';

// import du controller
const router = express.Router();

router.get('/');
router.get('/:id');
router.get('/test');
router.get('/test');
router.get('/test');
router.get('/test');
 
export default router;