import express from 'express';
import {getTestimonials, getTestimonial, addTestimonial, updateTestimonial, deleteTestimonial,} from '../controllers/testimonial.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', addTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
