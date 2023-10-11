import express from 'express';
import {getTestimonials, getTestimonial, addTestimonial, deleteTestimonial,} from '../controllers/testimonial.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', addTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
