import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { AiOutlineCar } from 'react-icons/ai';
import { GoCodeReview } from 'react-icons/go';
import { AiOutlineTeam } from 'react-icons/ai';
import { GrServices } from 'react-icons/gr';
import { MdSchedule } from 'react-icons/md';
import { RiPassValidLine } from 'react-icons/ri';
import { AiOutlineMessage } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';


export const Sidebar = ({ onSelectMenuItem }) => {

  //on récupère le  nom d'utilisateur qu'on affichera dans le dashboard
  const {currentUser} = useContext(AuthContext)

  return (
    <div className=" bg-stone-50 p-5 z-0 shadow-xl  pt-5">
      <h2 className="text-l font-bold mb-4 text-red-700">
          {currentUser?.username} - {currentUser?.role === 'admin' ? 'Administrateur': 
          currentUser?.role === 'staff' ? 'Employé' : currentUser?.role}</h2>
      <div className="mb-4 border-b border-gray-300"></div>
      <ul>
      <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('voir-messages')}>
          <div className="flex items-center">
            <AiOutlineMessage className="mr-2" />
            Messagerie
          </div>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('valider-temoignage')}>
          <div className="flex items-center">
            <RiPassValidLine className="mr-2" />
            Valider un témoignage
          </div>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-temoignage')}>
          <div className="flex items-center">
            <GoCodeReview className="mr-2" />
            Ajouter un témoignage
          </div>
        </li>
        <div className="mb-4 border-b border-gray-300"></div>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-voiture')}>
          <div className="flex items-center">
            <AiOutlineCar className="mr-2" />
            Ajouter une voiture
          </div>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('modifier-voiture')}>
          <div className="flex items-center">
            <AiOutlineEdit className="mr-2" />
            Modifier une voiture
          </div>
        </li>

        <div className="mb-4 border-b border-gray-300"></div>
        {currentUser && currentUser.role === 'admin' && (
          <>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-employe')}>
          <div className="flex items-center">
            <AiOutlineTeam className="mr-2" />
            Ajouter un employé
          </div>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('modifier-services')}>
          <div className="flex items-center">
            <GrServices className="mr-2" />
            Modifier un service
          </div>
        </li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('definir-horaires')}>
          <div className="flex items-center">
            <MdSchedule className="mr-2" />
            Définir les horaires
          </div>
        </li>
        <div className="mb-4 border-b border-gray-300"></div>
        </>
        )}
      </ul>
    </div>
  );
};

