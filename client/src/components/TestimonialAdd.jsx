import React, { useState } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

export const TestimonialAdd = () => {
  const [user, setUser] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // envoyer les données au serveur
    try {
      const response = await axios.post('http://localhost:8000/api/testimonials', {
        user,
        testimonial,
        note: rating,
        validated: 0,
      });
      // réinitialiser le formulaire / afficher un message de confirmation
      setUser('');
      setTestimonial('');
      setRating(0);
      setSubmissionStatus('Le témoignage a été envoyé avec succès!');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission du témoignage :', error);
      setSubmissionStatus('Une erreur s\'est produite lors de l\'envoi du témoignage.');
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
    <div className="w-[325px]">
      <h2 className="text-xl font-bold mb-4">Ajouter un témoignage</h2>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="mt-4 p-2 w-full">
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray-700">Nom :</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full px-3 py-1 border focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="testimonial" className="block text-gray-700">Témoignage :</label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
              className="w-full h-50 px-3 py-1 border focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">Note :</label>
            <div className="flex space-x-2">
              {renderStars()}
            </div>
          </div>
          <button type="submit" className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md">
            Soumettre
          </button>
          {submissionStatus && <p className="text-green-500 mt-2">{submissionStatus}</p>}
        </form>
      </div>
    </div>
  );
};

export const TestimonialButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <p
        className="text-red-600 hover:text-red-700 py-2 px-4 font-semibold cursor-pointer"
        onClick={handleOpenModal}
      >
        Laisser un témoignage
      </p>

      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex overflow-y-auto items-center justify-center z-100">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-20 pl-[300px] text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <IoMdClose size={30} />
            </button>
            <TestimonialAdd />
          </div>
        </div>
      )}
    </div>
  );
};