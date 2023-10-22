import express from 'express';
import {getTestimonials, getTestimonial, addTestimonial, deleteTestimonial, updateTestimonial} from '../controllers/testimonial.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', addTestimonial);
router.delete('/:id', deleteTestimonial);
router.put('/:id', updateTestimonial);

export default router;
