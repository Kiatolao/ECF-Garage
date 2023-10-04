import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
  
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages :', error);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    const filledStars = Array(rating).fill(null).map((_, index) => (
      <AiFillStar key={`filled-${index}`} className="text-yellow-500" />
    ));
  
    const emptyStars = Array(5 - rating).fill(null).map((_, index) => (
      <AiFillStar key={`empty-${index}`} className="text-gray-300" />
    ));
  
    return [...filledStars, ...emptyStars];
  };

  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {testimonials.filter((testimonial) => testimonial.validated === 1)
    .map((testimonial) => (
      <div
        key={testimonial.id}
        className="bg-white shadow-lg rounded-lg p-6 mb-4">
            
        <p className="font-semibold text-lg mb-2">{testimonial.user}</p>
        <div className="flex space-x-1 mb-2">{renderStars(testimonial.note)}</div>
        <p className="mt-4">{testimonial.testimonial}</p>

      </div>
    ))}
</div>
  );
};
