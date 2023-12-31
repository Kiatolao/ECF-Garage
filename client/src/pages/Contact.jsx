import React, { useState } from 'react';
import axios from 'axios';
import layer from '../assets/layer.jpg';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo2 from '../assets/parrot-logo.png';
import DOMPurify from 'isomorphic-dompurify';
import { SocialMedia } from '../components/Socialmedia';
import ReCAPTCHA from 'react-google-recaptcha';
import 'default-passive-events';

export function Contact() {
 
  const currentDate = new Date();
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [submissionStatusErr, setSubmissionStatusErr] = useState('');
  const sitekey = process.env.REACT_APP_SITE_KEY;

  const initialFormData = {
    lastName: DOMPurify.sanitize(''),
    firstName: DOMPurify.sanitize(''),
    email: DOMPurify.sanitize(''),
    phone: DOMPurify.sanitize(''),
    message: DOMPurify.sanitize(''),
    object: DOMPurify.sanitize(''),
    date: currentDate,
  };

  const [formData, setFormData] = useState(initialFormData);

  // gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData({ ...formData, [name]: sanitizedValue });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
  
    // vérification des regex
    const userRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
    const phoneRegex = /^[\d\s\-+]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const objectRegex = /^[a-zA-Z0-9À-ÿ\s-]+$/;
    const messageRegex = /^[A-Za-zÀ-ÿ0-9\s.,\-!?'’()]+$/;
  
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
  // update du state du recaptcha
  setFormData({ ...formData, recaptcha: value });
};

  return (
    <>
    <SocialMedia />
    <div>
    <img src={layer} alt="Moteur" className="h-[70px] w-full bg-cover shadow-xl bg-opacity-80"/>
      <div className="flex-grow border-t border-black"></div>
    </div>
    <div className="relative flex py-3 items-center p-5 pt-10">
      <div className="flex-grow border-t border-red-700"></div>
        <img src={logo2} className="h-[50px]" alt="logo garage parrot" />
      <div className="flex-grow border-t border-red-700"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-5 p-5">
      <div>
        <h2 className="text-xl font-bold mb-4 text-neutral-700">Contactez-nous</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-600">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 p-1"
            required />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-600">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded  px-3 p-1"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded  px-3 p-1"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600">Numéro de téléphone :</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded  px-3 p-1"
            required/>
        </div>
        <div className="mb-4">
          <label htmlFor="object" className="block text-gray-600">Objet :</label>
          <input
            type="text"
            id="object"
            name="object"
            value={formData.object || ''}
            onChange={handleChange}
            className="w-full border rounded  px-3"/>
        </div>
        <div className="mb-2">
          <label htmlFor="message" className="block text-gray-600">Message :</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3 p-1"
            rows="4"
            required>
            </textarea>
        </div>
        {/* message erreur/succes */}
        {submissionStatus && (
            <p className="text-green-500 mb-2">{DOMPurify.sanitize(submissionStatus)}</p>
        )}
        {submissionStatusErr && (
            <p className="text-red-500 mb-2">{DOMPurify.sanitize(submissionStatusErr)}</p>
        )}

        {/* intégration Recaptcha + site key */}
        <ReCAPTCHA
        sitekey={sitekey}
        onChange={handleRecaptchaChange}
      />
        <button
          type="submit"
          className="bg-red-700 text-white py-2 px-4 mb-4 mt-2 rounded  hover:bg-red-800 w-full">
          Envoyer
        </button>
      </form>
    </div>
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
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">        
          </iframe>
        </div>
      </div>
    </div>
    </>
  );
}