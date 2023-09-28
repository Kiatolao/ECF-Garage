import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { AiFillCar } from 'react-icons/ai';
import { GoCodeReview } from 'react-icons/go';
import { AiOutlineTeam } from 'react-icons/ai';
import { GrServices } from 'react-icons/gr';
import { MdSchedule } from 'react-icons/md';

const Sidebar = ({ onSelectMenuItem }) => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="w-1/4 h-screen bg-stone-50 p-5 z-0 shadow-lg">
      <h2 className="text-l font-bold mb-4 text-red-700">
          {currentUser?.username} - {currentUser?.role === 'admin' ? 'Administrateur': 
          currentUser?.role === 'staff' ? 'Employé' : currentUser?.role}</h2>
      <div className="mb-4 border-b border-gray-300"></div>
      <ul>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-voiture')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <AiFillCar style={{ marginRight: '0.5rem' }} />
          Ajouter une voiture
        </div></li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-temoignage')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GoCodeReview style={{ marginRight: '0.5rem' }} />
          Ajouter un témoignage
        </div></li>
        <div className="mb-4 border-b border-gray-300"></div>
        <p>Administration<br/></p>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('ajouter-employe')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AiOutlineTeam style={{ marginRight: '0.5rem' }} />
          Ajouter un employé
        </div></li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('modifier-services')}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GrServices style={{ marginRight: '0.5rem' }} />
          Modifier un service
        </div></li>
        <li className="mb-2 cursor-pointer" onClick={() => onSelectMenuItem('definir-horaires')}>        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MdSchedule style={{ marginRight: '0.5rem' }} />
          Définir les horaires
        </div></li>
        <div className="mb-4 border-b border-gray-300"></div>
      </ul>
    </div>
  );
};

export default Sidebar;
