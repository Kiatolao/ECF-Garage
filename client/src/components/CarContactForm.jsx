import React, { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import DOMPurify from 'isomorphic-dompurify';
import ReCAPTCHA from 'react-google-recaptcha';

export const CarContactForm = ({ carTitle }) => {
  const currentDate = new Date();
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submissionStatusErr, setSubmissionStatusErr] = useState('');
  const sitekey = process.env.REACT_APP_SITE_KEY;

  // récupération de l'objet du message carTitle
  const initialFormData = {
    lastName: DOMPurify.sanitize(''),
    firstName: DOMPurify.sanitize(''),
    email: DOMPurify.sanitize(''),
    phone: DOMPurify.sanitize(''),
    message: DOMPurify.sanitize(''),
    object: DOMPurify.sanitize(carTitle),
    date: currentDate,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData({ ...formData, [name]: sanitizedValue });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
  
    // vérification des regex
    const userRegex = /^[A-Za-z\s-]+$/;
    const phoneRegex = /^[\d\s\-+]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const objectRegex = /^[a-zA-Z0-9\s-]+$/;
    const messageRegex = /^[A-Za-z0-9\s.,\-!?'’()]+$/;
  
    if (!userRegex.test(formData.lastName) || !userRegex.test(formData.firstName)) {
      setSubmissionStatusErr('Le nom ne doit contenir que des lettres, des tirets et des espaces.');
      return;
    }
  
    if (!phoneRegex.test(formData.phone)) {
      setSubmissionStatusErr('Le numéro ne doit contenir que des chiffres, des espaces et des tirets.');
      return;
    }
  
    if (!emailRegex.test(formData.email)) {
      setSubmissionStatusErr('Veuillez entrer une adresse e-mail valide.');
      return;
    }
  
    if (!objectRegex.test(formData.object)) {
      setSubmissionStatusErr('L\'objet ne doit contenir que des lettres, des chiffres, des espaces et des tirets.');
      return;
    }
  
    if (!messageRegex.test(formData.message)) {
      setSubmissionStatusErr('Le message contient des caractères non autorisés.');
      return;
    }
  
    try {
      const captchaResponse = await axios.post(
        `${apiUrl}/api/recaptcha`,
        {
          response: formData.recaptcha,
        }
      );
  
      if (captchaResponse.data.success) {
        // si lee reCAPTCHA est valide, envoi du formulaire
        await axios.post(`${apiUrl}/api/messages`, formData, {
          withCredentials: true,
        });
        // réinitialisez le formulaire après l'envoi réussi
        setFormData({
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          message: '',
          object: '',
          date: '',
          recaptcha: '', 
        });
        setSubmissionStatus('Le message a été envoyé avec succès!');
      } else {
        console.error('Le reCAPTCHA est invalide');
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message', err);
      alert('Une erreur s\'est produite lors de l\'envoi du message.');
      setSubmissionStatus('Une erreur s\'est produite lors de l\'envoi du témoignage.');
    }
  };

  const handleRecaptchaChange = (value) => {
    // Update the formData state with the recaptcha value
    setFormData({ ...formData, recaptcha: value });
  };

  return (
    <div className="p-4 border border-neutral-300 bg-white shadow rounded-md grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-2xl mb-4">Contactez nous à propos de ce véhicule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="">
                <label htmlFor="firstName" className="block">Prénom :</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 w-full"/>
                </div>
                <div>
                <label htmlFor="lastName" className="block">Nom :</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 w-full"/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
            <label htmlFor="email" className="block">Email :</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-1 w-full"/>
            </div>
            <div className="">
            <label htmlFor="phone" className="block">Téléphone :</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-1 w-full"/>
            </div>
            </div>
        <div>
          <label htmlFor="object" className="block">Objet :</label>
          <input
            type="text"
            id="object"
            name="object"
            value={formData.object}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full"/>
        </div>
        <div>
          <label htmlFor="message" className="block">Message :</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full h-[175px]"/>
        </div>          

        {submissionStatus && <p className="text-green-500  mb-2">{submissionStatus}</p>}
        {submissionStatusErr && (
            <p className="text-red-500 mb-2">{DOMPurify.sanitize(submissionStatusErr)}</p>
        )}
                      <ReCAPTCHA
        sitekey={sitekey}
        onChange={handleRecaptchaChange}
      />
        <button 
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded w-full"
          >Envoyer</button>
      </form>
      </div>
      <div className="">
      <div>
        <div className="border rounded p-4 mb-4 text-neutral-700">
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" size={20} />
            <h2 className="text-xl font-bold ">Par téléphone</h2>
          </div>
          <p>010203040506</p>
        </div>
        <div className="border rounded p-4 text-neutral-700 mb-4">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" size={20} />
            <h2 className="text-xl font-bold">Nos locaux</h2>
          </div>
          <p>
            17 rue Nowhere<br />
            Fougères
            35300
          </p>
        </div>
        <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42423.72584773053!2d-1.1953339499999998!3d48.35124450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48093778fd795953%3A0x6531938abaecd607!2s35133%20Foug%C3%A8res!5e0!3m2!1sfr!2sfr!4v1697717732880!5m2!1sfr!2sfr"
          title="Google Maps"
          width="100%"
          height="340"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">        
          </iframe>
        </div>
      </div>
      </div>
    </div>
  );
};