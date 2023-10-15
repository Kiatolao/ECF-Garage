import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';
import { BiSolidQuoteRight } from 'react-icons/bi';
import { LiaUserEditSolid } from 'react-icons/lia';

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
  <>
  <div className="mt-10 mb-3">
    <h1 className="text-2xl text-red-600 flex justify-center items-center font-semibold">
      <LiaUserEditSolid size={30} className="text-red-600 mr-1" /> Vos témoignages
    </h1>
  </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {testimonials.filter((testimonial) => testimonial.validated === 1)
        .map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white shadow-md rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between mb-2 text-2xl">
              <div className="flex items-center space-x-1">
                {renderStars(testimonial.note)}
              </div>
              <BiSolidQuoteRight className="text-gray-200" />
            </div>
            <p className="mt-4">"{testimonial.testimonial}"</p>
            <p className="font-semibold text-lg mb-2 pt-3 text-red-500">{testimonial.user}</p>
          </div>
        ))}
    </div>
</>
  );
};
