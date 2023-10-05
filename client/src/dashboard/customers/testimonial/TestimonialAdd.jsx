import React, { useState } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

export const TestimonialAdd = () => {
  const [user, setUser] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // envoyer les données au serveur
    try {
      const response = await axios.post('http://localhost:8000/api/testimonials', {
        user,
        testimonial,
        note: rating,
        validated: 1, 
      }, {
        withCredentials: true,
    });
      // réinitialiser le formulaire/ afficher un message de confirmation
      setUser('');
      setTestimonial('');
      setRating(0);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission du témoignage :', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiFillStar
          key={i}
          onClick={() => setRating(i)}
          className={`text-2xl cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <>
    <h2 className="text-xl font-bold mb-4">Ajouter un témoignage</h2>
        <form onSubmit={handleSubmit} className="max-w-md  mt-4 p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="user" className="block text-gray-700">Nom :</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="testimonial" className="block text-gray-700">Témoignage :</label>
        <textarea
          id="testimonial"
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">Note :</label>
        <div className="flex space-x-2">
          {renderStars()}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
        Soumettre
      </button>
    </form>
    </>

  );
};


