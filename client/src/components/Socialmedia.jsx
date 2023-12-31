import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';

export const SocialMedia = () => {
  const [expanded, setExpanded] = useState(false);

  //fonction qui verifie le state d'un bouton qui permettre de montrer les réseaux sociaux
  const handleMediaShareClick = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div className="fixed right-0 top-1/4 transform -translate-y-1/2 z-100 mt-10">
      <div className="flex items-center bg-white border-black shadow-2xl">
        <button
          onClick={handleMediaShareClick}
          className={` bg-red-700   text-white py-1 px-1 focus:outline-none transition-transform ${
            expanded ? '-translate-x-5' : 'translate-x-0'
          }`}
        >
          <IoShareSocialOutline size={30} />
        </button>
        {expanded && (
          <div className="flex items-center mr-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-600 mx-3">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-400 mx-3">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-800 mx-3">
              <FaLinkedin />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};