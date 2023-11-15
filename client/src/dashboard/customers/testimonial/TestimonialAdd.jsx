import React, { useState } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import DOMPurify from 'isomorphic-dompurify';


export const TestimonialAdd = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // envoyer les données au serveur
    try {
      const response = await axios.post(`${apiUrl}/api/testimonials`, {
        user: DOMPurify.sanitize(user),
        testimonial: DOMPurify.sanitize(testimonial),
        note: DOMPurify.sanitize(rating),
        validated: 1, 
      }, {
        withCredentials: true,
    });
      // réinitialiser le formulaire/ afficher un message de confirmation et affiché message success/error
      setUser('');
      setTestimonial('');
      setRating(0);
      setStatus('success');
      console.log(response.data);
    } catch (error) {
      setStatus('error');
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

    <div className="">
      <h2 className="text-xl font-bold mb-4">Ajouter un témoignage</h2>

      <div className="max-w-[500px]">
      <form onSubmit={handleSubmit} className="mt-4 p-2 w-full">
        <div className="mb-4">
          <label className="block text-gray-700">Nom :</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="w-full px-3 py-1 border  focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Témoignage :</label>
          <textarea
            id="testimonial"
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            required
            className="w-full h-50 px-3 py-1 border focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Note :</label>
          <div className="flex space-x-2">
            {renderStars()}
          </div>
        </div>
        {status === 'success' && 
            <p className="text-green-700 font-semibold mb-2">Le témoignage a été ajoutée avec succes</p>
          }

          {status === 'error' &&
            <p className="text-red-700 font-semibold mb-2">Erreur lors de l'ajout du témoignage</p>
          }
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ">
          Soumettre
        </button>
      </form>
      </div>
    </div>
  );
};


