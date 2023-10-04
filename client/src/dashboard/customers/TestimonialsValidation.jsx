import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

export const TestimonialsValidation = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/testimonials?validated=0', {
          withCredentials: true,
        });
        setTestimonials(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages :', error);
      }
    };

    fetchTestimonials();
  }, []);

  const validateTestimonial = async (testimonialId) => {
    try {
      await axios.put(`http://localhost:8000/api/testimonials/${testimonialId}`, {
        validated: 1,
      }, {
        withCredentials: true,
      });

    } catch (error) {
      console.error('Erreur lors de la validation du témoignage :', error);
    }
  };

  const deleteTestimonial = async (testimonialId) => {
    try {
      await axios.delete(`http://localhost:8000/api/testimonials/${testimonialId}`, {
        withCredentials: true,
      });

    } catch (error) {
      console.error('Erreur lors de la suppression du témoignage :', error);
    }
  };

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
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white shadow-lg rounded-lg p-6 mb-4"
        >
          <p className="font-semibold text-lg mb-2">{testimonial.user}</p>
          <div className="flex space-x-1 mb-2">{renderStars(testimonial.note)}</div>
          <p className="mt-4">{testimonial.testimonial}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
            onClick={() => validateTestimonial(testimonial.id)}
          >
            Valider
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 ml-2"
            onClick={() => deleteTestimonial(testimonial.id)}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};


