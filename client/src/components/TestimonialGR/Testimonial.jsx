import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';
import { BiSolidQuoteRight } from 'react-icons/bi';
import { LiaUserEditSolid } from 'react-icons/lia';
import { TestimonialButton } from './TestimonialAdd';
import { BeatLoader} from 'react-spinners'; 

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAllComments, setShowAllComments] = useState(false);
  const [loading, setLoading] = useState(true);

  //afficher plus de commentaire par set de 3
  const showMoreComments = () => {
    setVisibleCount(visibleCount + 3);
  };

  const toggleComments = () => {
    if (showAllComments) {
      setVisibleCount(3);
    }
    setShowAllComments(!showAllComments);
  };

  //récupération des témoignages
  useEffect(() => {
  
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/testimonials`);
        setTestimonials(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages ');
      }
    };

    fetchTestimonials();
  }, []);

  // système de notation du témoignage, on combine les étoiles remplie et pleine
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
      <LiaUserEditSolid size={30} className="text-red-700 mr-1" /> Vos témoignages
    </h1>
  </div>
  <>
  <div className="flex items-center justify-center">
    {loading && <BeatLoader color="rgba(214, 54, 54, 1)" className='pt-10'/>}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {/* filtre les commentaires valides, les affiche par 3, itère le schema du témoignage avec map() */}
        {testimonials
          .filter((testimonial) => testimonial.validated === 1)
          .slice(0, visibleCount)
          .map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-md rounded-lg p-3 ">
              <div className="flex items-center justify-between mb-2 text-2xl">
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.note)}
                </div>
                <BiSolidQuoteRight className="text-gray-200" />
              </div>
              <p className="mt-4">"{testimonial.testimonial}"</p>
              <p className="font-semibold text-lg mb-2 pt-3 text-red-700">{testimonial.user}</p>
            </div>
          ))}
      </div>
      {/* conditions pour afficher les témoignages: si tem. >3 on affiche 'voir plus de commentaires' et il n'y plus de tem. à afficher
          on affiche 'Cacher commentaires'
      */}
     {testimonials.length > 3 && (
  <div className="flex flex-col items-center mb-5 sm:flex-row sm:justify-center">
    {visibleCount < testimonials.length ? (
      <p
        onClick={showMoreComments}
        className="text-red-600 hover:text-red-700 py-2 px-4 font-semibold cursor-pointer"
      >
        {showAllComments ? 'Cacher les commentaires' : 'Voir plus de commentaires'}
      </p>
    ) : (
      <p
        onClick={toggleComments}
        className="text-red-600 hover:text-red-700 py-2 px-4 font-semibold cursor-pointer"
      >
        Cacher les commentaires
      </p>
          )}
          <TestimonialButton />
        </div>
      )}
      </>
      
</>
  );
};
