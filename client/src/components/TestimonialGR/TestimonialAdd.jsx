import React, { useState } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import DOMPurify from 'isomorphic-dompurify';
import ReCAPTCHA from "react-google-recaptcha";

export const TestimonialAdd = () => {

  const [user, setUser] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submissionStatusErr, setSubmissionStatusErr] = useState('');
  const [captchaValidated, setCaptchaValidated] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const key = process.env.REACT_APP_SITE_KEY;

  //envoie du formulaire si les condition regex et captcha sont valides
  const handleSubmit = async (e) => {
    e.preventDefault();

      // vérification regex
      const userRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
      const testimonialRegex = /^[A-Za-zÀ-ÿ0-9\s.,\-!?'’()]+$/;
      const noteRegex = /^[0-5]$/;

      if (!userRegex.test(user)) {
        setSubmissionStatusErr('Le nom ne doit contenir que des lettres, des tirets et des espaces.');
        return;
      }

      if (!testimonialRegex.test(testimonial)) {
        setSubmissionStatusErr('Le témoignage contient des caractères non autorisés.');
        return;
      }

      if (!noteRegex.test(rating)) {
        setSubmissionStatusErr('La note doit être comprise entre 0 et 5.');
        return;
      }

    // vérification captcha coté serveur
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const captchaResponse = await axios.post(`${apiUrl}/api/recaptcha`, {
        response: captchaValue,
      });

      if (captchaResponse.data.success) {
        const testimonialResponse = await axios.post(`${apiUrl}/api/testimonials`, {
          user: DOMPurify.sanitize(user),
          testimonial: DOMPurify.sanitize(testimonial),
          note: DOMPurify.sanitize(rating),
          validated: 0,
        });

        // Réinitialiser le formulaire / Afficher un message de confirmation
        setUser('');
        setTestimonial('');
        setRating(0);
        setSubmissionStatus('Le témoignage a été envoyé avec succès!');
        console.log(testimonialResponse.data);
      } else {
        setSubmissionStatusErr('Erreur de validation reCAPTCHA.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du témoignage :', error);
      setSubmissionStatus('Une erreur s\'est produite lors de l\'envoi du témoignage.');
    } finally {
      // Réinitialiser l'état
      setCaptchaValidated(false);
      setCaptchaValue(''); // Réinitialiser la valeur du reCAPTCHA
    }
  };

  //attribue une note
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

  // changement de statu du captcha
  const onChange = (value) => {
    if (value) {
      setCaptchaValue(value); 
      setCaptchaValidated(true);
    }
  };

  return (
    <div className="w-[325px]">
      <div className="w-full">
        <form onSubmit={handleSubmit} className="mt-4 p-2 w-full">
          <div className="mb-4">
            <label className="block text-gray-700">Nom :</label>
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
            <label  className="block text-gray-700">Témoignage :</label>
            <textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
              className="w-full h-40 px-3 py-1 border focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {submissionStatus && <p className="text-green-500 mt-2 mb-2">{submissionStatus}</p>}
          {submissionStatusErr && <p className="text-red-500 mt-2 mb-2">{submissionStatusErr}</p>}
          <div className="mb-4">
            <label  className="block text-gray-700">Note :</label>
            <div className="flex space-x-2">
              {renderStars()}
            </div>
          </div>
          <ReCAPTCHA
            sitekey={key}
            onChange={onChange}
            className="mb-2"/>
          {/* Ici on desactive le bouton de soumission par sécurité tant que qu'on aura pas cocher le captcha
              De plus il ne sera pas possible de soumettre le formulaire tant que la secret key du captcha ne sera pas vérifiée
          */}
          <button
              type="submit"
              disabled={!captchaValidated}
              className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-md">
              Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

// Ouvvrir la modal pour laisser un témoignage
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
          <div className="bg-white p-4 rounded-lg shadow-lg top-10 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <IoMdClose size={30} />
            </button>
            <h2 className="text-xl font-bold mb-4">Ajouter un témoignage</h2>
            <TestimonialAdd />
          </div>
        </div>
      )}
    </div>
  );
};